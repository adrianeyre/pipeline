import Monster from '../monster';
import IMonsterProps from '../interfaces/monster-props';
import MonsterTypeEnum from '../enums/monster-type-enum';
import DirectEnum from '../enums/direction-enum';

describe('Monster', () => {
	let defaultConfig: IMonsterProps

	beforeEach(() => {
		defaultConfig = {
			key: 'monster-01',
			visable: true,
			x: 1,
			y: 2,
			width: 3,
			height: 4,
			blocksWidth: 5,
			blocksHeight: 6,
			type: MonsterTypeEnum.DIRECTIONAL,
			direction: DirectEnum.DOWN,
		}
	})

	it('Should create Monster class', () => {
		const board = new Monster(defaultConfig);

		expect(board.key).toEqual('monster-01');
		expect(board.visable).toEqual(true);
		expect(board.x).toEqual(1);
		expect(board.y).toEqual(5);
		expect(board.width).toEqual(3);
		expect(board.height).toEqual(4);
		expect(board.blocksWidth).toEqual(5);
		expect(board.blocksHeight).toEqual(6);
		expect(board.type).toEqual(MonsterTypeEnum.DIRECTIONAL);
		expect(board.direction).toEqual(DirectEnum.DOWN);
	});
});