import ISprite from './sprite';
import StriteTypeEnum from '../enums/sprite-type-enum';

export default interface IBoard {
	board: number[][];
	setBoard(sprites: ISprite[], playerX: number, playerY: number): ISprite[];
	updateBoard(sprites: ISprite[], playerX: number, playerY: number): ISprite[];
	validate(x: number, y: number): StriteTypeEnum;
	setBlock(block: number, x: number, y: number): number;
}
