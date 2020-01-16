import IBoard from '../interfaces/board';
import DirectionEnum from '../enums/direction-enum';
import PlayerResultEnum from '../enums/player-result-enum';

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
	image: string;
	isAlive: boolean;
	move(board: IBoard, playerX: number, playerY: number): PlayerResultEnum;
	moveMonstersWithPlayer(playerX: number, playerY: number): PlayerResultEnum;
}
