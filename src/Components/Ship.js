import React from 'react';
import { useDrag } from 'react-dnd';

function Ship({ coord, length, isHorizontal }) {
  const { row, col } = coord;
  const [{ isDragging }, drag] = useDrag({
    item: { 
      type: 'ship',
      row: row,
      col: col, 
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  })

  const gridRowStart = row + 1;
  const gridColumnStart = col + 1;

  const shipStyle = {
    background: '#39bdf1',
    border: '2px solid #0000FF',
    gridColumnStart: `${gridColumnStart}`,
    gridRowStart: `${gridRowStart}`,
    opacity: isDragging ? 0.2 : 0.6,
  }
  shipStyle['gridColumnEnd'] = isHorizontal ? `span ${length}` : 'span 1';
  shipStyle['gridRowEnd'] = isHorizontal ? 'span 1' : `span ${length}`;
  return (
    <div
      ref={drag}
      className="ship"
      style={shipStyle}
    >
    </div>
  )
}

export default Ship;