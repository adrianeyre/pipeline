import MonsterTypeEnum from '../enums/monster-type-enum';
import DirectEnum from 'classes/enums/direction-enum';

export default interface IMonsterProps {
	key: string;
	visable: boolean;
	x: number;
	y: number;
	width: number;
	height: number;
	blocksWidth: number;
	blocksHeight: number;
	type: MonsterTypeEnum;
	direction: DirectEnum;
}
