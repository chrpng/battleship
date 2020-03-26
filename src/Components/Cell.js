import React from 'react';

function Cell({ val, coord, playerBoard, setPlayerBoard, handleCellClick }) {
  // const { updatePlayer1Board, canUpdatePlayer1Board } = useContext(Context);
  // const [{ isOver }, drop] = useDrop({
  //   accept: 'ship',
  //   canDrop: (item, monitor) => {
  //     return true;
  //     return monitor.isOver();
  //     return canUpdatePlayer1Board(item.row, item.col, x, y);
  //   },
  //   drop: (item) => {
  //     console.log(item);
  //     updatePlayer1Board(item.row, item.col, x, y);
  //     return undefined;
  //   },
  // })

  const [row, col] = coord;
  const gridRowStart = row + 1;
  const gridColumnStart = col + 1;

  const cellStyle = {
    gridRowStart: `${gridRowStart}`,
    gridRowEnd: 'span 1',
    gridColumnStart: `${gridColumnStart}`,
    gridColumnEnd: 'span 1',
  }
  return (
    <li
      className="cell" 
      onClick={(e) => handleCellClick(e.target.dataset.row, e.target.dataset.col)} 
      data-row={row} 
      data-col={col}
      style={cellStyle}
    >
      {val}
    </li>
  )
}

export default Cell;