import Inventory from '../inventory';
import IInventoryProps from '../interfaces/inventory-props';

describe('Inventory', () => {
	let defaultConfig: IInventoryProps

	beforeEach(() => {
		defaultConfig = {
			spriteBlockWidth: 1,
			spriteBlockHeight: 2,
			spriteWidth: 3,
			spriteHeight: 4,
			maxItems: 5,
		}
	})

	it('Should create Inventory class', () => {
		const board = new Inventory(defaultConfig);

		expect(board.spriteBlockWidth).toEqual(1);
		expect(board.spriteBlockHeight).toEqual(2);
		expect(board.spriteWidth).toEqual(3);
		expect(board.spriteHeight).toEqual(4);
		expect(board.maxItems).toEqual(5);
	});
});