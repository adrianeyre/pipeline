// import { cloneDeep } from 'lodash';

import IBoard from './interfaces/board';
import ISprite from './interfaces/sprite';
import IInventory from './interfaces/inventory';
import IMonster from './interfaces/monster';
import Sprite from './sprite';
import Inventory from './inventory';
import Monster from './monster';
import SpriteTypeEnum from './enums/sprite-type-enum';
import ImageEnum from './enums/image-enum';
import StriteTypeEnum from './enums/sprite-type-enum';
import PlayerResultEnum from './enums/player-result-enum';
import DirectionEnum from './enums/direction-enum';
import MonsterTypeEnum from './enums/monster-type-enum';
import IBoardProps from './interfaces/board-props';
import IFileService from '../services/interfaces/file-service';
import FileService from '../services/file-service';

export default class Board implements IBoard {
	public board: number[][];
	public sprites: ISprite[];
	public monsters: IMonster[];
	public inventory: IInventory;
	public spriteSelection: ISprite[];
	public currentLevel: number;
	public startX: number;
	public startY: number;
	public fileService: IFileService;
	public boardWidth: number;
	public boardHeight: number;
	public xMargin: number;
	public yMargin: number;

	readonly SPRITE_BLOCKS_WIDTH: number = 12;
	readonly SPRITE_BLOCKS_HEIGHT: number = 12;
	readonly SPRITE_WIDTH: number = 3;
	readonly SPRITE_HEIGHT: number = 3;

	constructor(config: IBoardProps) {
		this.fileService = new FileService();
		this.currentLevel = config.currentLevel
		this.board = [[]]
		this.startX = config.playerX;
		this.startY = config.playerY;
		this.sprites = [];
		this.monsters = [];
		this.boardWidth = 0;
		this.boardHeight = 0;
		this.xMargin = 0;
		this.yMargin = 0;
		this.spriteSelection = this.allSprites();
		this.inventory = new Inventory({
			spriteBlockWidth: this.SPRITE_BLOCKS_WIDTH,
			spriteBlockHeight: this.SPRITE_BLOCKS_HEIGHT,
			spriteWidth: this.SPRITE_WIDTH,
			spriteHeight: this.SPRITE_HEIGHT,
		});
	}

	public setBoard = (playerX: number, playerY: number): void => {
		this.sprites = [];
		let xPos = this.xStart(playerX);
		let yPos = this.yStart(playerY);

		for (let x = 1; x <= this.SPRITE_BLOCKS_WIDTH; x++) {
			for(let y = 1; y <= this.SPRITE_BLOCKS_HEIGHT; y++) {
				this.sprites.push(this.newBlock(x, y, xPos, yPos, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, this.board[yPos][xPos]));
				yPos ++;
			}
			yPos = this.yStart(playerY);
			xPos ++;
		}

		this.moveMonstersWithPlayer(playerX, playerY);
	}

	public updateBoard = (playerX: number, playerY: number): void => {
		let xPos = this.xStart(playerX);
		let yPos = this.yStart(playerY);

		for(let x = 1; x <= this.SPRITE_BLOCKS_WIDTH; x++) {
			for(let y = 1; y <= this.SPRITE_BLOCKS_HEIGHT; y++) {
				this.updateBlock(this.board[yPos][xPos], x, y, xPos, yPos);
				yPos ++;
			}
			yPos = this.yStart(playerY);
			xPos ++;
		}
	}

	public validate = (x: number, y: number): StriteTypeEnum => this.board[y-1][x-1];
	public setBlock = (block: number, x: number, y: number): number => this.board[y-1][x-1] = block;

	public moveBoulder = (block: SpriteTypeEnum, x: number, y: number, direction: DirectionEnum): PlayerResultEnum => {
		let xPos = x;
		let yPos = y;

		switch (direction) {
			case DirectionEnum.UP:
				yPos --; break;
			case DirectionEnum.RIGHT:
				xPos ++; break;
			case DirectionEnum.DOWN:
				yPos ++; break;
			case DirectionEnum.LEFT:
				xPos --; break;
		}

		if (this.board[yPos-1][xPos-1] === 0) {
			this.setBlock(SpriteTypeEnum.BLANK, x, y)
			this.setBlock(block, xPos, yPos)
			this.updateBlock(SpriteTypeEnum.BLANK, x, y, xPos, yPos);
			this.updateBlock(block, xPos, yPos, xPos, yPos);
			return PlayerResultEnum.BOLDER_MOVED;
		}

		return PlayerResultEnum.SAFE;
	}

	public teleport = (playerX: number, playerY: number, block: SpriteTypeEnum): any => {
		for (let y = 1; y < this.board.length; y++) {
			const x = this.board[y].indexOf(block);
			if (x > -1 && playerX - 1 !== x && playerY - 1 !== y) {
				return { xPos: x + 1, yPos: y + 1 };
			}
		}

		return { xPos: null, yPos: null };
	}

	public moveMonstersWithPlayer = (playerX: number, playerY: number): PlayerResultEnum => {
		const results = this.monsters.map((monster: IMonster) => monster.moveMonstersWithPlayer(playerX, playerY));
		return results.indexOf(PlayerResultEnum.LOOSE_LIFE) > - 1 ? PlayerResultEnum.LOOSE_LIFE : PlayerResultEnum.SAFE;
	}

	public moveMonstersWithTimer = (playerX: number, playerY: number): PlayerResultEnum => {
		const results = this.monsters.map((monster: IMonster) => monster.move(this.isMyBlock, playerX, playerY));
		return results.indexOf(PlayerResultEnum.LOOSE_LIFE) > - 1 ? PlayerResultEnum.LOOSE_LIFE : PlayerResultEnum.SAFE;
	}

	public dropItem = (type: SpriteTypeEnum, playerX: number, playerY: number, direction: DirectionEnum): boolean => {
		let x = playerX,
			y = playerY;

		switch (direction) {
			case DirectionEnum.UP:
				y--; break;
			case DirectionEnum.RIGHT:
				x++; break;
			case DirectionEnum.DOWN:
				y++; break;
			case DirectionEnum.LEFT:
				x--; break;
		}

		if (this.isMyBlock(x, y, SpriteTypeEnum.BLANK)) {
			this.setBlock(type, x, y);
			this.updateBoard(playerX, playerY);
			return true
		}

		return false;
	}

	public isMyBlock = (x: number, y: number, type: SpriteTypeEnum): boolean => this.board[y-1][x-1] === type;

	public readLevel = async (): Promise<void> => {
		this.board = await this.fileService.readFile(this.currentLevel);
	}

	public getBoard = async (): Promise<void> => {
		await this.readLevel();

		const { xPos, yPos } = this.getPlayerStartPosition();
		this.startX = xPos ?? this.startX;
		this.startY = yPos ?? this.startY;
		if (xPos && yPos) this.board[yPos-1][xPos-1] = 0;

		this.setBoard(this.startX, this.startY);
		this.monsters = this.getMonsters();
		this.boardWidth = this.board[0].length;
		this.boardHeight = this.board.length;
		this.xMargin = Math.floor(this.SPRITE_BLOCKS_WIDTH / 2);
		this.yMargin = Math.floor(this.SPRITE_BLOCKS_HEIGHT / 2);
	}

	public boulderDrop = (playerX: number, playerY: number): void => {
		const boulders = [];

		for(let x = 0; x <= this.board.length; x++) {
			for(let y = 0; y < this.board[0].length; y++) {
				if (
					this.board[y][x] === SpriteTypeEnum.DROP_BOULDER &&
					y < this.boardHeight - this.yMargin - 1 &&
					this.board[y + 1][x] === SpriteTypeEnum.BLANK
				) boulders.push({ direction: DirectionEnum.DOWN, x, y });

				if (
					this.board[y][x] === SpriteTypeEnum.DROP_BOULDER &&
					y < this.boardHeight - this.yMargin - 1 &&
					this.board[y + 1][x] === SpriteTypeEnum.DROP_WALL_RIGHT &&
					this.board[y][x + 1] === SpriteTypeEnum.BLANK
				) boulders.push({ direction: DirectionEnum.RIGHT, x, y });

				if (
					this.board[y][x] === SpriteTypeEnum.DROP_BOULDER &&
					y < this.boardHeight - this.yMargin - 1 &&
					this.board[y + 1][x] === SpriteTypeEnum.DROP_WALL_LEFT &&
					this.board[y][x - 1] === SpriteTypeEnum.BLANK
				) boulders.push({ direction: DirectionEnum.LEFT, x, y });
			}
		}

		boulders.forEach((boulder: any) => this.dropBoulder(boulder.direction, boulder.x, boulder.y, playerX, playerY));
	}

	private dropBoulder = (direction: DirectionEnum, x: number, y: number, playerX: number, playerY: number): void => {
		if (x + 1 === playerX && y + 2 === playerY) return;
		this.board[y][x] = SpriteTypeEnum.BLANK;
		if (direction === DirectionEnum.DOWN) this.board[y + 1][x] = SpriteTypeEnum.DROP_BOULDER;
		if (direction === DirectionEnum.RIGHT) this.board[y][x + 1] = SpriteTypeEnum.DROP_BOULDER;
		if (direction === DirectionEnum.LEFT) this.board[y][x - 1] = SpriteTypeEnum.DROP_BOULDER;
		this.updateBoard(playerX, playerY)
	}

	private getPlayerStartPosition = (): any => {
		for (let y = 1; y < this.board.length; y++) {
			const x = this.board[y].indexOf(SpriteTypeEnum.START);
			if (x > -1) {
				return { xPos: x + 1, yPos: y + 1 };
			}
		}

		return { xPos: null, yPos: null };
	}

	private getMonsters = (): IMonster[] => {
		const monsters: IMonster[] = [];

		for(let x = 0; x <= this.board.length; x++) {
			for(let y = 0; y < this.board[0].length; y++) {
				const block = this.board[y][x];
				if (block >= 97 && block <= 99) {
					this.board[y][x] = SpriteTypeEnum.BLANK;
					const type: string = MonsterTypeEnum[block];
					const direction: string = DirectionEnum[block - 96];

					monsters.push(new Monster({
						key: `monster-${ monsters.length + 1 }`,
						visable: true,
						x: x + 1,
						y: y + 1,
						width: 3,
						height: 3,
						blocksWidth: this.SPRITE_BLOCKS_WIDTH,
						blocksHeight: this.SPRITE_BLOCKS_HEIGHT,
						type: MonsterTypeEnum[type],
						direction: DirectionEnum[direction],
					}));
				}
			}
		}

		return monsters;
	}

	private updateBlock = (block: number, x: number, y: number, blockX: number, blockY: number): void => {
		const sprite = this.sprites.find((spr: ISprite) => spr.key === `sprite-${ x }-${ y }`);
		if (!sprite) return;

		const type: string = SpriteTypeEnum[block];
		sprite.updateImage(ImageEnum[this.spriteName(block)]);
		sprite.updateType(SpriteTypeEnum[type]);
		sprite.blockX = blockX + 1;
		sprite.blockY = blockY + 1;
	}

	private xStart = (playerX: number): number => playerX - Math.floor(this.SPRITE_BLOCKS_WIDTH / 2) - 1;
	private yStart = (playerY: number): number => playerY - Math.floor(this.SPRITE_BLOCKS_HEIGHT / 2) - 1;

	private newBlock = (x: number, y: number, blockX: number, blockY: number, width: number, height: number, block: number): ISprite => {
		const type: string = SpriteTypeEnum[block];

		return new Sprite({
			key: `sprite-${ x }-${ y }`,
			visable: true,
			x: (x - 1) * width + 1,
			y: (y - 1) * height + 1,
			blockX: blockX + 1,
			blockY: blockY + 1,
			width,
			height,
			image: ImageEnum[this.spriteName(block)],
			type: SpriteTypeEnum[type],
			outline: false,
		})
	}

	private allSprites = (): ISprite[] => {
		const sprites = Object.keys(SpriteTypeEnum)
		const halfLength = Math.ceil(sprites.length / 2);
		let x = 0;
		let y = 1;
		
		const allSprites: ISprite[] = sprites.splice(0, halfLength).map((value: string, block: number) => {
			x++;
			if (x > this.SPRITE_BLOCKS_WIDTH * this.SPRITE_WIDTH) {
				x = 1;
				y++;
			}
			return this.newBlock(x, y, 1, 1, 1, 1, parseInt(value))
		})

		return allSprites;
	}

	private spriteName = (sprite: number) => `SPRITE${ sprite.toString().length === 1 ? '0' : '' }${ sprite }`;
}