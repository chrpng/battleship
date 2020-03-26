import Ship from './../ShipFactory'

describe('Ship', () => {
  let ship1, ship2;
  beforeAll(() => {
    ship1 = Ship(1, 2, 1);
    ship2 = Ship(1, 2, 3);
  })

  describe('ships can generate their coordinates array', () => {
    test('ship1 gets coordinates', () => {
      expect(ship1.getShipCoordsArr()).toEqual([{ row: 1, col: 2 }]);
    })
    test('ship2 gets coordinates', () => {
      expect(ship2.getShipCoordsArr()).toEqual(
        [
          { row: 1, col: 2 },
          { row: 2, col: 2 },
          { row: 3, col: 2 }
        ]
      )
    })
  })
  
  describe('ship can keep track of its health', () => {
    test('ship2 that has health is not sunk', () => {
      expect(ship2.isSunk()).toBe(false);
      ship2.hit();
      expect(ship2.isSunk()).toBe(false);
    })
    test('ship2 without health sinks', () => {
      ship2.hit();
      ship2.hit();
      expect(ship2.isSunk()).toBe(true);
    })
  })
})