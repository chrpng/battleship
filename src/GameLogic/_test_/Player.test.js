import Gameboard from './../GameboardFactory';
import Player from './../Player';

describe('player options', () => {
  let enemyGameboard, player;
  beforeAll(() => {
    enemyGameboard = Gameboard();
    enemyGameboard.placeNewShip(1, 2, 1, true);
    player = Player(null, true);
  })
  
  test('player can attack', () => {
    expect(enemyGameboard.getBoard()[1][2]).toBe('S');
    player.attack(enemyGameboard, 1, 2);
    expect(enemyGameboard.getBoard()[1][2]).toBe('H');
  })
});

describe('human player tests', () => {
  let player;
  beforeAll(() => {
    player = Player('Javier', true);
  })

  test('human player can register name', () => {
    expect(player.getPlayerName()).toBe('Javier');
  })
})

describe('CPU player tests', () => {
  let cpuPlayer;
  beforeAll(() => {
    cpuPlayer = Player(null, false);
  })

  test('CPU player has CPU name', () => {
    expect(cpuPlayer.getPlayerName()).toBe('CPU');
  })
})