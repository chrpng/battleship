import Gameboard from './../GameboardFactory';
import Ship from "./../ShipFactory";

describe('Gameboard', () => {
  let gameboard;
  beforeAll(() => {
    gameboard = Gameboard();
  })

  test('gameboard can place ship at (1, 2)', () => {
    expect(gameboard.placeNewShip(1, 2, 1, true)).toBe(true);
    expect(gameboard.getShips()).toHaveLength(1);
  })

  test('board array knows if array location has ship', () => {
    expect(gameboard.getBoard()[1][2]).toBe('S');
  })

  test('gameboard knows if attack hit ship', () => {
    expect(gameboard.receiveAttack(1, 2)).toBe(true);
    expect(gameboard.receiveAttack(4, 4)).toBe(false);
  })

  test('board array knows if array location was hit/miss', () => {
    expect(gameboard.getBoard()[1][2]).toBe('H');
    expect(gameboard.getBoard()[4][4]).toBe('M');
  })

  test('gameboard tells ship that it is sunk', () => {
    expect(gameboard.getShips()[0].isSunk()).toBe(true);
  })

  test('gameboard can report if all ships are sunk', () => {
    expect(gameboard.areAllShipsSunk()).toBe(true);
    expect(gameboard.placeNewShip(3, 4, 3, true)).toBe(true);
    expect(gameboard.areAllShipsSunk()).toBe(false);
  })
})