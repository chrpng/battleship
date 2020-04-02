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
  let board = createBoard(BOARD_SIZE);
  let ships = [];

  const shipsObjectArr = [
    { quantity: 1, length: 4},
    { quantity: 2, length: 3},
    { quantity: 3, length: 2},
    { quantity: 4, length: 1},
  ]

  const getBoardSize = () => BOARD_SIZE;
  const getBoard = () => board;
  const getShips = () => ships;

  const getShip = (row, col) => {
    return ships.find(ship => ship.getShipCoordsArr().some(shipCoords => shipCoords.row === row && shipCoords.col === col))
  }

  const filterInboundCoords = (coordsArr) => (
    coordsArr.filter(coords => 
      isInbounds(coords.row) && isInbounds(coords.col)
    )
  )

  const isInbounds = (num) => num >= 0 && num < BOARD_SIZE

  const getOffsetCoords = (coords, offsetRow, offsetCol) => (
    coords.map(coord => {
      return {
        row: coord.row + offsetRow, 
        col: coord.col + offsetCol 
      }
    })
  )

  const placeNewShip = (row, col, length = 1, isHorizontal = true) => {
    // Generate new ship based on input parameters
    const newShip = Ship(row, col, length, isHorizontal);

    const returnVal = canPlaceShip(newShip, row, col);
    if(!returnVal) return false;

    // Push ship to ship array
    ships.push(newShip);

    // Mark ship squares on board 2D array
    for (let i = 0; i < length; i++) {
      isHorizontal ? board[row][col + i] = 'S'
                   : board[row + i][col] = 'S';
    }
    return true;
  }

  const moveShip = (ship, toCol, toRow) => {
    // remove ship's old location from board
    deleteShipFromBoard(ship);

    // remove old ship from ship array
    ships = ships.filter(currShip => currShip !== ship);

    //generate new ship
    placeNewShip(toCol, toRow, ship.length, ship.isHorizontal);
  }

  const deleteShipFromBoard = (ship) => {
    ship.getShipCoordsArr().forEach(coord => {
      board[coord.row][coord.col] = '';
    })
  }

  const addShipToBoard = (ship) => {
    ship.getShipCoordsArr().forEach(coord => {
      board[coord.row][coord.col] = 'S';
    })
  }
  
  const canPlaceShip = (ship, row, col, offsetRow = 0, offsetCol = 0) => {
    const toRow = row + offsetRow;
    const toCol = col + offsetCol;
    
    // Make sure the head of the ship is inbounds
    const isHeadInbounds =  isInbounds(toRow) && isInbounds(toCol);
    // Make sure the tail of the ship is inbounds
    const isTailInbounds = ship.isHorizontal 
                            ? toCol + ship.length <= 10
                            : toRow + ship.length <= 10;
    if(!isHeadInbounds || !isTailInbounds) return false;

    // Get coordinates
    const shipCoords = ship.getShipCoordsArr();
    const adjacentCoords = ship.getShipAdjacentArr();

    // Calculate adjacent coordinates at theoretical new position 
    const offsetShipCords = getOffsetCoords(shipCoords, offsetRow, offsetCol);
    const offsetAdjacentCoords = getOffsetCoords(adjacentCoords, offsetRow, offsetCol);

    // Check if every coord at new position is empty
    const isFreeSpace = offsetShipCords.every(coord => board[coord.row][coord.col] === '')
    // Filter away adjacent coords which are out-of-bounds then check if remaining coords are empty
    const inboundAdjacentCoords = filterInboundCoords(offsetAdjacentCoords);
    const isFreeNeighborSpace = inboundAdjacentCoords.every(coord => board[coord.row][coord.col] === '')

    return isFreeSpace && isFreeNeighborSpace;
  }

  const canMoveShip = (ship, row, col, toRow, toCol) => {
    // Remove ship from board temporarily so the ship doesn't see itself in the board check
    deleteShipFromBoard(ship);

    const offsetRow = toRow - row;
    const offsetCol = toCol - col;

    const returnVal = canPlaceShip(ship, row, col, offsetRow, offsetCol);
    
    // Re-add ship to board
    addShipToBoard(ship);

    return returnVal;
  }

  const randomizeShips = () => {
    clearShips();

    shipsObjectArr.forEach(shipsObject => {
      for(let i = 0; i < shipsObject.quantity; i++) {
        let randRow, randCol, randHoriz, successfulPlace;
        do {
          randRow = Math.floor(Math.random() * BOARD_SIZE);
          randCol = Math.floor(Math.random() * BOARD_SIZE);
          randHoriz = Math.random() > 0.5;
          successfulPlace = placeNewShip(randRow, randCol, shipsObject.length, randHoriz)
        }
        // Look for a new location if the chosen coordinate was previously tried
        while (!successfulPlace);
      }
    })
  }

  const clearShips = () => {
    ships = [];
    board = board.map(row => row.map(col => ''))
  }

  const receiveAttack = (r, c) => {
    //returns object with two values: isValid and isHit
    const row = parseInt(r);
    const col = parseInt(c);

    if(!isInbounds(row) || !isInbounds(col)) return { isValid: false, isHit: false }

    let isValid, isHit;
    switch (board[row][col]) {
      case 'S':
        // Record hit on board array
        board[row][col] = 'H';

        // Find ship located at hit location
        const shipHit = getShip(row, col);

        // let the hit ship process the hit
        if(shipHit) shipHit.hit();

        if(shipHit.isSunk()) {
          const adjacentCoords = shipHit.getShipAdjacentArr();
          const inboundAdjacentCoords = filterInboundCoords(adjacentCoords);

          inboundAdjacentCoords.forEach(coord => {
            board[coord.row][coord.col] = 'M'
          })
        }
        
        isValid = true;
        isHit = true;
        break;
      case '':
        // Record miss on board array
        board[row][col] = 'M';
        
        isValid = true;
        isHit = false;
        break;
      default:
        console.log('cannot attack same location again')

        isValid = false;
        isHit = false;
        break;
    }
    return { isValid, isHit }
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
    randomizeShips,
    receiveAttack,
    areAllShipsSunk,
  }
}

export default Gameboard;