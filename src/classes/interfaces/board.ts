import ISprite from './sprite';
import IInventory from './inventory';
import IMonster from './monster';
import StriteTypeEnum from '../enums/sprite-type-enum';
import PlayerResultEnum from '../enums/player-result-enum';
import DirectionEnum from '../enums/direction-enum';
import SpriteTypeEnum from '../enums/sprite-type-enum';
import IFileService from '../../services/interfaces/file-service';

export default interface IBoard {
	board: number[][];
	sprites: ISprite[];
	monsters: IMonster[];
	inventory: IInventory;
	spriteSelection: ISprite[];
	startX: number;
	startY: number;
	boardWidth: number;
	boardHeight: number;
	xMargin: number;
	yMargin: number;
	stars: number;
	fileService: IFileService;
	collectStar(): number;
	getBoard(): Promise<void>;
	boulderDrop(playerX: number, playerY: number): PlayerResultEnum;
	setBoard(playerX: number, playerY: number): void;
	updateBoard(playerX: number, playerY: number): void;
	validate(x: number, y: number): StriteTypeEnum;
	setBlock(block: number, x: number, y: number): number;
	moveBoulder(block: SpriteTypeEnum, x: number, y: number, direction: DirectionEnum): PlayerResultEnum;
	moveMonstersWithPlayer(playerX: number, playerY: number): PlayerResultEnum;
	moveMonstersWithTimer(playerX: number, playerY: number): PlayerResultEnum;
	teleport(x: number, y: number, block: SpriteTypeEnum): any;
	isMyBlock(x: number, y: number, type: SpriteTypeEnum): boolean;
	dropItem(type: SpriteTypeEnum, playerX: number, playerY: number, direction: DirectionEnum): boolean;
	readLevel(): Promise<void>;
}
