import Gameboard from './GameboardFactory';

const playerAttack = (gameboard, row, col) => {
  gameboard.receiveAttack(row, col);
}

const pcAttack = (gameboard) => {
  let randRow, randCol;
  do {
    randRow = Math.floor(Math.random() * gameboard.getBoardSize());
    randCol = Math.floor(Math.random() * gameboard.getBoardSize());
  }
  // Look for a new location if the chosen coordinate was previously tried
  while (gameboard.getBoard()[randRow][randCol] === ('H' || 'M'));

  gameboard.receiveAttack(randRow, randCol);
}

function Player(playerName = 'Player 1', isHuman = false) {
  const name = isHuman ? playerName : 'CPU';
  const gameboard = Gameboard(name);
  
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