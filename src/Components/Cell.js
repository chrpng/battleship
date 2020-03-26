import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';

import { Context } from './../App';

function Cell({ val, coord, playerBoard, setPlayerBoard, handleCellClick }) {
  const { updatePlayer1Board, canUpdatePlayer1Board } = useContext(Context);
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'ship',
    canDrop: (item, monitor) => {
      return true;
      return monitor.isOver();
      return canUpdatePlayer1Board(item.row, item.col, x, y);
    },
    drop: (item) => {
      console.log(item);
      updatePlayer1Board(item.row, item.col, x, y);
      return undefined;
    },
    //collect: (monitor) => 
  })

  const [x, y] = coord;
  const gridRowStart = x + 1;
  const gridColumnStart = y + 1;

  const cellStyle = {
    gridRowStart: `${gridRowStart}`,
    gridRowEnd: 'span 1',
    gridColumnStart: `${gridColumnStart}`,
    gridColumnEnd: 'span 1',
  }
  return (
    <li
      ref={drop}
      className="cell" 
      onClick={handleCellClick} 
      data-row={x} 
      data-col={y}
      style={cellStyle}
    >
      {val}
    </li>
  )
}

export default Cell;