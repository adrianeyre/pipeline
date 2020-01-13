import DirectionEnum from '../enums/direction-enum';
import PlayerResultEnum from '../enums/player-result-enum';
import IBoard from './board';
import ISprite from './sprite';

export default interface IPlayer {
	key: string;
	visable: boolean;
	x: number;
	y: number;
	blockX: number;
	blockY: number
	width: number;
	height: number;
	iteration: number;
	zIndex: number
	direction: DirectionEnum;
	score: number;
	lives: number;
	image: string;
	isAlive: boolean;
	move(direction: DirectionEnum, board: IBoard, sprites: ISprite[]): PlayerResultEnum;
}
