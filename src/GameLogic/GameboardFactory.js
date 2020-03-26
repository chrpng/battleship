import Ship from "./ShipFactory"

const createBoard = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push([]);
    for (let j = 0; j < len; j++) {
      arr[i].push('');
    }
  }
  return arr;
}

function Gameboard(name) {
  const BOARD_SIZE = 10;
  const board = createBoard(BOARD_SIZE);
  let ships = [];

  const getBoardSize = () => BOARD_SIZE;
  const getBoard = () => board;
  const getShips = () => ships;

  const getShip = (row, col) => {
    return ships.find(ship => ship.getShipCoordsArr().some(shipCoords => shipCoords.row === row && shipCoords.col === col))
  }

  const placeNewShip = (row, col, length = 1, isHorizontal = true) => {
    // Generate new ship based on input parameters
    const newShip = Ship(row, col, length, isHorizontal);

    // Push ship to ship array
    ships.push(newShip);

    // Mark ship squares on board 2D array
    for (let i = 0; i < length; i++) {
      isHorizontal ? board[row][col + i] = 'S'
                   : board[row + i][col] = 'S';
    }
    return true;
  }

  const moveShip = (toX, toY, ship) => {
    // remove ship's old location from board
    deleteShip(ship);

    // remove old ship from ship array
    ships = ships.filter(currShip => currShip !== ship);

    //generate new ship
    placeNewShip(toX, toY, ship.length, ship.isHorizontal);
  }

  const deleteShip = (ship) => {
    ship.getShipCoordsArr().forEach(coord => {
      board[coord.row][coord.col] = '';
    })
  }

  const canMoveShip = (toX, toY, ship) => {
    return true;
    if (toX < 0 || toX >= 10 || toY < 0 || toY >= 10) return false;
    switch(ship.isHorizontal) {
      case true:
        return toX + ship.length <= 10;
      case false:
        return toY + ship.length <= 10;
      default:
        break;
    }
  }

  const receiveAttack = (r, c) => {
    const row = parseInt(r);
    const col = parseInt(c);
    switch (board[row][col]) {
      case 'S':
        // Record hit on board array
        board[row][col] = 'H';

        // Find ship located at hit location
        const shipHit = getShip(row, col);

        // let the hit ship process the hit
        shipHit.hit();
        return true;
      case '':
        // Record miss on board array
        board[row][col] = 'M';
        return false;
      default:
        console.log('cannot attack same location again')
        return false;
    }
  }

  const areAllShipsSunk = () => {
    return ships.every(ship => ship.isSunk());
  }

  return {
    get name() {
      return name;
    },
    getBoardSize,
    placeNewShip,
    moveShip,
    canMoveShip,
    getBoard,
    getShips,
    getShip,
    receiveAttack,
    areAllShipsSunk,
  }
}

export default Gameboard;