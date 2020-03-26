import React, { useContext } from 'react';
import { Context } from './../App';
import Board from './Board';

function PlayerBoard({ name }) {
  const {
    player1Gameboard, 
    setPlayer1Gameboard, 
    player2Gameboard, 
    setPlayer2Gameboard 
  } = useContext(Context);

  let playerGameboard, setPlayerGameboard;

  if(name === player1Gameboard.name) {
    playerGameboard = player1Gameboard;
    setPlayerGameboard = setPlayer1Gameboard;
  } else if(name === player2Gameboard.name) {
    playerGameboard = player2Gameboard;
    setPlayerGameboard = setPlayer2Gameboard;

  }

  return (
    <Board playerGameboard={playerGameboard} setPlayerGameboard={setPlayerGameboard}></Board>
  )
}

export default PlayerBoard;