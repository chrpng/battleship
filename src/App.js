import React, { useState, useEffect, createContext } from 'react';
import './App.css';
import './reset.css'
import Board from './Components/Board';

import Player from './GameLogic/Player';

import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

export const Context = createContext();

let player1 = Player('Juan', true);
let player2 = Player();

function App() {
  const [player1Board, setPlayer1Board] = useState([]);
  const [player2Board, setPlayer2Board] = useState([]);
  const [ships, setShips] = useState([]);
  const [player1Turn, setPlayer1Turn] = useState();
  //const [cpuBoard, setCPUBoard] = useState([]);
  
  const init = () => {
    console.log('onload!')
    // player1 = Player('Juan', true);
    player1.gameboard.placeNewShip(1, 2, 3, true);
    player1.gameboard.placeNewShip(5, 4, 2, false);
    setPlayer1Board(player1.gameboard.getBoard()); // do you need to generate new object to prevent state mutation?
    setShips(player1.gameboard.getShips());

    // player2 = Player();
    player2.gameboard.placeNewShip(4, 5, 1, false); //doesn't affect the player2.gameboard in function scope?
    player2.gameboard.placeNewShip(2, 1, 3, false);
    setPlayer2Board(player2.gameboard.getBoard());

    setPlayer1Turn(true);
  }

  useEffect(() => {
    init()
  }, []);

  const canUpdatePlayer1Board = (row, col, toRow, toCol) => {
    const ship = player1.gameboard.getShip(row, col);
    return player1.gameboard.canMoveShip(toRow, toCol, ship);
  }

  const updatePlayer1Board = (row, col, toRow, toCol) => {
    const ship = player1.gameboard.getShip(row, col);
    player1.gameboard.moveShip(toRow, toCol, ship)

    setShips([...player1.gameboard.getShips()]);
    setPlayer1Board([...player1.gameboard.getBoard()]);
  }

  const handleCellClick = (row, col) => {
    if(player1Turn) {
      //Player 1 attacks Player 2's gameboard
      playerTurn(player2.gameboard, row, col);
    }
  }

  const playerTurn = (gameboard, row, col) => {
    player1.attack(gameboard, row, col);
    setPlayer2Board(gameboard.getBoard().slice());

    computerTurn(player1.gameboard);
  }

  const computerTurn = (gameboard) => {
    player2.attack(gameboard);
  }

  const boards = !!player2Board ? (
    <section className="boards-flex">
      <Board playerBoard={player1Board} setPlayerBoard={setPlayer1Board} ships={ships}></Board>
      <Board playerBoard={player2Board} setPlayerBoard={setPlayer2Board} handleCellClick={handleCellClick}></Board>
    </section>
  ) : 'loading...'

  return (
    <Context.Provider 
      value={{
        updatePlayer1Board,
        canUpdatePlayer1Board,
      }}
    >
      <DndProvider backend={Backend}>
        <div className="App">
          <header className="App-header">
            <h1>Battleship</h1>
          </header>
          <main>
            {boards}
          </main>
        </div>
      </DndProvider>
    </Context.Provider>
  );
}

export default App;
