import React from 'react';
import './Board.css';

import Cell from './Cell';
import Ship from './Ship';

function Board({ playerBoard, setPlayerBoard, handleCellClick, ships }) {
  if (typeof playerBoard === 'undefined') return 'No board loaded';
  //if (Object.entries(playerGameboard).length === 0) return 'Board has no entries';

  //const ships = playerGameboard.getShips();

  const renderCells = () => {
    console.log(playerBoard);
    return playerBoard.map((row, rowIdx) => 
      row.map((col, colIdx) => 
        <Cell
          key={`r${rowIdx}c${colIdx}`} 
          coord={[rowIdx, colIdx]}
          playerBoard={playerBoard}
          setPlayerBoard={setPlayerBoard}
          handleCellClick={handleCellClick}
          val={col}
        />
      )
    )
  }


  const renderShips = () => (
    ships ? ships.map((ship, idx) => 
      <Ship
        key={idx}
        coord={ship.getShipCoordsArr()[0]}
        length={ship.length}
        isHorizontal={ship.isHorizontal}
      />
    ) : null
  )

  // function handleCellClick(toX, toY) {
  //   playerBoard.moveShip(toX, toY);
  //   setPlayerBoard(playerBoard);
  // }
  return (
    <ul className="board-grid">
      {renderCells()}
      {renderShips()}
    </ul>
  )
}

export default Board;