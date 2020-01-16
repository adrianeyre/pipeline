import DirectionEnum from '../enums/direction-enum';
import PlayerResultEnum from '../enums/player-result-enum';
import MonsterTypeEnum from '../enums/monster-type-enum';

export default interface IMonster {
	key: string;
	visable: boolean;
	outline: boolean;
	x: number;
	y: number;
	blockX: number;
	blockY: number
	blocksWidth: number;
	blocksHeight: number;
	width: number;
	height: number;
	iteration: number;
	zIndex: number
	direction: DirectionEnum;
	type: MonsterTypeEnum;
	image: string;
	isAlive: boolean;
	move(isBlankBlock: any, playerX: number, playerY: number): PlayerResultEnum;
	moveMonstersWithPlayer(playerX: number, playerY: number): PlayerResultEnum;
}
