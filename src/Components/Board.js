import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';

import { Context } from './../App';

import './Board.css';

import Cell from './Cell';
import Ship from './Ship';

function Board({ playerBoard, handleCellClick, ships }) {
  const { movePlayer1Board, canMovePlayer1Board, isStart, isPlayer1Turn } = useContext(Context);
  const [, drop] = useDrop({
    accept: 'ship',
    canDrop: (item, monitor) => {
      const offset = monitor.getDifferenceFromInitialOffset();
      const { toRow, toCol } = calcDropLocation(item.row, item.col, offset);
      return !isStart && canMovePlayer1Board(item.row, item.col, toRow, toCol);
    },
    drop: (item, monitor) => {
      console.log(item);
      const offset = monitor.getDifferenceFromInitialOffset();
      const { toRow, toCol } = calcDropLocation(item.row, item.col, offset);
      movePlayer1Board(item.row, item.col, toRow, toCol);
      return undefined;
    },
  })

  const calcDropLocation = (row, col, { x: offsetCol, y: offsetRow }) => {
    const toRow = row + Math.round(offsetRow / 40);
    const toCol = col + Math.round(offsetCol / 40);
    return { toRow, toCol }
  }

  const renderCells = () => (
    playerBoard ? playerBoard.map((row, rowIdx) => 
      row.map((col, colIdx) => 
        <Cell
          key={`r${rowIdx}c${colIdx}`} 
          coord={[rowIdx, colIdx]}
          handleCellClick={handleCellClick}
          val={col}
        />
      )
    ) : null
  )

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

  return (
    <ul className={`board-grid ${!ships ? 'enemy' : ''} ${isStart && isPlayer1Turn ? 'can-attack' : ''}`} ref={drop}>
      {renderShips()}
      {renderCells()}
    </ul>
  )
}

export default Board;