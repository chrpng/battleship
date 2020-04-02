const createShipCoords = (row, col, length, isHorizontal) => {
  const coordsArr = [];

  for (let i = 0; i < length; i++) {
    isHorizontal ? coordsArr.push({ row, col: col + i })
                 : coordsArr.push({ row: row + i, col });
  }
  return coordsArr;
}

const createAdjacentCoords = (row, col, length, isHorizontal) => {
  const adjacentArr = [];

  for (let i = -1; i < length + 1; i++) {
    if(isHorizontal) {
      if(i === -1 || i === length) adjacentArr.push({ row: row    , col: col + i })
      adjacentArr.push({ row: row - 1, col: col + i })
      adjacentArr.push({ row: row + 1, col: col + i })
    } else {
      if(i === -1 || i === length) adjacentArr.push({ row: row + i, col: col     })
      adjacentArr.push({ row: row + i, col: col - 1 })
      adjacentArr.push({ row: row + i, col: col + 1 })
    }
  }

  return adjacentArr;
}

function Ship(row, col, length = 1, isHorizontal = true) {
  let health = length;
  const shipCoordsArr = createShipCoords(row, col, length, isHorizontal);
  const shipAdjacentArr = createAdjacentCoords(row, col, length, isHorizontal);

  const getShipCoordsArr = () => shipCoordsArr;
  const getShipAdjacentArr = () => shipAdjacentArr;

  const hit = () => {
    health--;
  };

  const isSunk = () => {
    //if at least one position of the ship is healthy, the ship is not sunk
    return health <= 0;
  }

  return {
    getShipCoordsArr,
    getShipAdjacentArr,
    get length() { return length },
    get isHorizontal() { return isHorizontal },
    hit,
    isSunk
  }
}

export default Ship;