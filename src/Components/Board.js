import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';

import { Context } from './../App';

import './Board.css';

import Cell from './Cell';
import Ship from './Ship';

function Board({ playerBoard, setPlayerBoard, handleCellClick, ships }) {
  const { updatePlayer1Board, canUpdatePlayer1Board } = useContext(Context);
  const [{ isOver }, drop] = useDrop({
    accept: 'ship',
    canDrop: (item, monitor) => {
      return true;
      return monitor.isOver();
    },
    drop: (item, monitor) => {
      console.log(item);
      const offset = monitor.getDifferenceFromInitialOffset();
      const { toRow, toCol } = calcDropLocation(item.row, item.col, offset);
      updatePlayer1Board(item.row, item.col, toRow, toCol);
      return undefined;
    },
  })

  const calcDropLocation = (row, col, { x: offsetCol, y: offsetRow }) => {
    const toRow = row + Math.round(offsetRow / 40);
    const toCol = col + Math.round(offsetCol / 40);
    return { toRow, toCol }
  }

  if (typeof playerBoard === 'undefined') return 'No board loaded';
  //if (Object.entries(playerGameboard).length === 0) return 'Board has no entries';

  //const ships = playerGameboard.getShips();

  const renderCells = () => {
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
    <ul className="board-grid" ref={drop}>
      {renderShips()}
      {renderCells()}
    </ul>
  )
}

export default Board;