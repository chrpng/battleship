const createShipCoords = (row, col, length, isHorizontal) => {
  const coordsArr = [];

  for (let i = 0; i < length; i++) {
    isHorizontal ? coordsArr.push({ row, col: col + i })
                 : coordsArr.push({ row: row + i, col });
  }
  return coordsArr;
}

function Ship(row, col, length = 1, isHorizontal = true) {
  let health = length;
  const shipCoordsArr = createShipCoords(row, col, length, isHorizontal);

  const getShipCoordsArr = () => shipCoordsArr;

  const hit = () => {
    console.log('hit!')
    health--;
  };

  const isSunk = () => {
    //if at least one position of the ship is healthy, the ship is not sunk
    return health <= 0;
  }

  return {
    getShipCoordsArr,
    get length() { return length },
    get isHorizontal() { return isHorizontal },
    hit,
    isSunk
  }
}

export default Ship;