import DirectionEnum from '../enums/direction-enum';
import PlayerResultEnum from '../enums/player-result-enum';
import IBoard from './board';

export default interface IPlayer {
	key: string;
	visable: boolean;
	outline: boolean;
	x: number;
	y: number;
	blockX: number;
	blockY: number
	startX: number;
	startY: number;
	width: number;
	height: number;
	iteration: number;
	zIndex: number
	direction: DirectionEnum;
	score: number;
	lives: number;
	image: string;
	isAlive: boolean;
	inPipe: boolean;
	setStartPosition(x: number, y: number): void;
	looseLife(): PlayerResultEnum;
	move(direction: DirectionEnum, board: IBoard, editing: boolean): PlayerResultEnum;
}
