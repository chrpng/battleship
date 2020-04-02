import Gameboard from './GameboardFactory';

function Player(playerName = 'Player 1', isHuman = false) {
  let targets = [];
  const name = isHuman ? playerName : 'CPU';
  const gameboard = Gameboard(name);

  const playerAttack = (gameboard, row, col) => {
    return gameboard.receiveAttack(row, col);
  }
  
  const pcAttack = (gameboard) => {
    let attackObj;
    let randRow, randCol;
    do {
      if(targets.length > 0) {
        const target = targets.pop();
        randRow = target.row;
        randCol = target.col;
      } else {
        randRow = Math.floor(Math.random() * gameboard.getBoardSize());
        randCol = Math.floor(Math.random() * gameboard.getBoardSize());
      }
  
      attackObj = gameboard.receiveAttack(randRow, randCol);
    }
    // Look for a new location if the chosen coordinate was previously tried
    while (attackObj.isValid === false);

    if(attackObj.isHit) {
      targets.push({ row: randRow - 1, col: randCol     })
      targets.push({ row: randRow + 1, col: randCol     })
      targets.push({ row: randRow    , col: randCol - 1 })
      targets.push({ row: randRow    , col: randCol + 1 })
    }
  
    return attackObj;
  }

  const attack = isHuman ? playerAttack : pcAttack;

  return {
    get gameboard() {
      return gameboard;
    },
    get name() {
      return name
    },
    attack,
  }
}

export default Player;