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
  const [isPlayer1Turn, setIsPlayer1Turn] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  //const [cpuBoard, setCPUBoard] = useState([]);
  
  const init = () => {
    // player1 = Player('Juan', true);
    // player1.gameboard.placeNewShip(1, 2, 3, true);
    // player1.gameboard.placeNewShip(3, 2, 2, true);
    // player1.gameboard.placeNewShip(5, 4, 2, false);
    // player1.gameboard.placeNewShip(5, 7, 1, false);
    player1.gameboard.randomizeShips();
    setPlayer1Board(player1.gameboard.getBoard()); // do you need to generate new object to prevent state mutation?
    setShips(player1.gameboard.getShips());

    // player2 = Player();
    // player2.gameboard.placeNewShip(4, 5, 1, false); //doesn't affect the player2.gameboard in function scope?
    player2.gameboard.randomizeShips();
    setPlayer2Board(player2.gameboard.getBoard());

    setIsPlayer1Turn(true);
  }

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    // Start Player 2's turn
    computerTurn(player1.gameboard);
  }, [isPlayer1Turn]);

  const canMovePlayer1Board = (row, col, toRow, toCol) => {
    const ship = player1.gameboard.getShip(row, col);
    return player1.gameboard.canMoveShip(ship, row, col, toRow, toCol);
  }

  const movePlayer1Board = (row, col, toRow, toCol) => {
    const ship = player1.gameboard.getShip(row, col);
    player1.gameboard.moveShip(ship, toRow, toCol)

    setShips(player1.gameboard.getShips());
    setPlayer1Board(player1.gameboard.getBoard());
  }

  const randomizePlayer1Ships = () => {
    if(!isStart) {
      player1.gameboard.randomizeShips();
      setPlayer1Board(player1.gameboard.getBoard());
      setShips(player1.gameboard.getShips());
    }
  }

  const handleCellClick = (e) => {
    //Player 1 attacks Player 2's gameboard
    playerTurn(player2.gameboard, e.target.dataset.row, e.target.dataset.col);
  }

  const playerTurn = (gameboard, row, col) => {
    if(!isGameOver && isStart && isPlayer1Turn) {
      let attackObj = player1.attack(gameboard, row, col);
      if (!attackObj.isValid) return;

      // Update DOM gameboard
      setPlayer2Board(gameboard.getBoard().slice());

      if(gameboard.areAllShipsSunk()) {
        setIsGameOver(true);
      } 

      if(!attackObj.isHit && !isGameOver) {
        // Pass turn to Player 2
        setIsPlayer1Turn(false);
      }
    }
  }

  const computerTurn = async (gameboard) => {
    if(!isGameOver && isStart && !isPlayer1Turn) {
      let attackObj;
      do {
        // Wait some time before letting the computer attack
        attackObj = await new Promise(function(resolve) {
          setTimeout(() => {
            resolve(player2.attack(gameboard));
          }, 500)
        })

        // Update DOM gameboard after awaiting the attack
        setPlayer1Board(gameboard.getBoard().slice());

        if(gameboard.areAllShipsSunk()) {
          setIsGameOver(true);
        }
      } 
      while (!isGameOver && attackObj.isHit)

      if(!isGameOver) {
        // Pass turn to Player 1
        setIsPlayer1Turn(true);
      }
    }
  }

  const restartGame = () => {
    player1.gameboard.randomizeShips();
    setPlayer1Board(player1.gameboard.getBoard());
    setShips(player1.gameboard.getShips());

    player2.gameboard.randomizeShips();
    setPlayer2Board(player2.gameboard.getBoard());

    setIsPlayer1Turn(true);
    setIsStart(false);
    setIsGameOver(false);
  }

  const gameText = (() => {
    if(isGameOver) return isPlayer1Turn ? 'Player 1 Wins!' : 'Player 2 Wins!'
    if(!isStart) return 'Set your board...'

    return isPlayer1Turn ? 'Your Move' : 'Their Move'
  })();
  
  const boards = !!player2Board ? (
    <section className="boards-flex">

      <Board playerBoard={player1Board} ships={ships}></Board>
      <div className="middle-console">
        {
          isStart ? <button onClick={restartGame}>New Game</button>
                  : <button className="start-btn" onClick={() => setIsStart(true)}>Start</button>
        }
        <button className={isStart ? "disabled" : ""} onClick={randomizePlayer1Ships}>Randomize</button>
        <div className="game-text">{gameText}</div>
      </div>
      <Board playerBoard={player2Board} handleCellClick={handleCellClick}></Board>
    </section>
  ) : 'loading...'

  return (
    <Context.Provider 
      value={{
        movePlayer1Board,
        canMovePlayer1Board,
        isStart,
        isPlayer1Turn
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
