import React from 'react';

function Cell({ val, coord, handleCellClick }) {

  const [row, col] = coord;
  const gridRowStart = row + 1;
  const gridColumnStart = col + 1;

  const cellStyle = {
    gridRowStart: `${gridRowStart}`,
    gridRowEnd: 'span 1',
    gridColumnStart: `${gridColumnStart}`,
    gridColumnEnd: 'span 1',
  }

  const cellClass = val === 'H' ? 'cell-x hit' 
                  : val === 'M' ? 'cell-x'
                  : '';

  const cellContents = val === 'H' || val === 'M' ? 'X' : null;

  return (
    <li
      className={`cell ${cellClass}`}
      onClick={handleCellClick} 
      data-row={row} 
      data-col={col}
      style={cellStyle}
    >
      {cellContents}
    </li>
  )
}

export default Cell;