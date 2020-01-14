import ISprite from './sprite';
import StriteTypeEnum from '../enums/sprite-type-enum';
import PlayerResultEnum from '../enums/player-result-enum';
import DirectionEnum from '../enums/direction-enum';

export default interface IBoard {
	board: number[][];
	sprites: ISprite[];
	setBoard(playerX: number, playerY: number): void;
	updateBoard(playerX: number, playerY: number): void;
	validate(x: number, y: number): StriteTypeEnum;
	setBlock(block: number, x: number, y: number): number;
	moveBolder(x: number, y: number, direction: DirectionEnum): PlayerResultEnum;
	isVerticalPipe(x: number, y: number): boolean;
	isHorizontalPipe(x: number, y: number): boolean;
	isJunctionPipe(x: number, y: number): boolean;
}
