import ISprite from './sprite';
import StriteTypeEnum from '../enums/sprite-type-enum';
import PlayerResultEnum from '../enums/player-result-enum';
import DirectionEnum from '../enums/direction-enum';
import SpriteTypeEnum from '../enums/sprite-type-enum';

export default interface IBoard {
	board: number[][];
	sprites: ISprite[];
	setBoard(playerX: number, playerY: number): void;
	updateBoard(playerX: number, playerY: number): void;
	validate(x: number, y: number): StriteTypeEnum;
	setBlock(block: number, x: number, y: number): number;
	moveBolder(x: number, y: number, direction: DirectionEnum): PlayerResultEnum;
	teleport(x: number, y: number, block: SpriteTypeEnum): any;
	isVerticalPipe(x: number, y: number): boolean;
	isHorizontalPipe(x: number, y: number): boolean;
	isConnectionPipe(x: number, y: number): boolean;
	isBlankBlock(x: number, y: number): boolean;
}
