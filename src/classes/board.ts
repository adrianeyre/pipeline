import { cloneDeep } from 'lodash';

import IBoard from './interfaces/board';
import ISprite from './interfaces/sprite';
import IInventory from './interfaces/inventory';
import Sprite from './sprite';
import Inventory from './inventory';
import SpriteTypeEnum from './enums/sprite-type-enum';
import ImageEnum from './enums/image-enum';
import StriteTypeEnum from './enums/sprite-type-enum';
import PlayerResultEnum from './enums/player-result-enum';
import DirectionEnum from './enums/direction-enum';
import IBoardProps from './interfaces/board-props';

import * as level01 from './data/level01';

export default class Board implements IBoard {
	public board: number[][];
	public sprites: ISprite[];
	public inventory: IInventory;
	public currentLevel: number;
	public startX: number;
	public startY: number;

	readonly SPRITE_BLOCKS_WIDTH: number = 12;
	readonly SPRITE_BLOCKS_HEIGHT: number = 12;
	readonly SPRITE_WIDTH: number = 3;
	readonly SPRITE_HEIGHT: number = 3;
	readonly levels = [level01];

	constructor(config: IBoardProps) {
		this.currentLevel = config.currentLevel
		this.board = cloneDeep(this.levels[this.currentLevel - 1].default);
		this.sprites = [];
		this.inventory = new Inventory({
			spriteBlockWidth: this.SPRITE_BLOCKS_WIDTH,
			spriteBlockHeight: this.SPRITE_BLOCKS_HEIGHT,
			spriteWidth: this.SPRITE_WIDTH,
			spriteHeight: this.SPRITE_HEIGHT,
		});

		const { xPos, yPos } = this.getPlayerStartPosition();
		this.startX = xPos ?? config.playerX;
		this.startY = yPos ?? config.playerY;
		if (xPos && yPos) this.board[yPos-1][xPos-1] = 0;

		this.setBoard(this.startX, this.startY);
	}

	public setBoard = (playerX: number, playerY: number): void => {
		this.sprites = [];
		let xPos = this.xStart(playerX);
		let yPos = this.yStart(playerY);

		for (let x = 1; x <= this.SPRITE_BLOCKS_WIDTH; x++) {
			for(let y = 1; y <= this.SPRITE_BLOCKS_HEIGHT; y++) {
				this.sprites.push(this.newBlock(x, y, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, this.board[yPos][xPos]));
				yPos ++;
			}
			yPos = this.yStart(playerY);
			xPos ++;
		}
	}

	public updateBoard = (playerX: number, playerY: number): void => {
		let xPos = this.xStart(playerX);
		let yPos = this.yStart(playerY);

		for(let x = 1; x <= this.SPRITE_BLOCKS_WIDTH; x++) {
			for(let y = 1; y <= this.SPRITE_BLOCKS_HEIGHT; y++) {
				this.updateBlock(this.board[yPos][xPos], x, y);
				yPos ++;
			}
			yPos = this.yStart(playerY);
			xPos ++;
		}
	}

	public validate = (x: number, y: number): StriteTypeEnum => this.board[y-1][x-1];
	public setBlock = (block: number, x: number, y: number): number => this.board[y-1][x-1] = block;

	public moveBolder = (x: number, y: number, direction: DirectionEnum): PlayerResultEnum => {
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
			this.setBlock(0, x, y)
			this.setBlock(3, xPos, yPos)
			this.updateBlock(0, x, y);
			this.updateBlock(3, xPos, yPos);
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

	private getPlayerStartPosition = (): any => {
		for (let y = 1; y < this.board.length; y++) {
			const x = this.board[y].indexOf(-1);
			if (x > -1) {
				return { xPos: x + 1, yPos: y + 1 };
			}
		}

		return { xPos: null, yPos: null };
	}

	public isVerticalPipe = (x: number, y: number): boolean => this.board[y-1][x-1] === SpriteTypeEnum.VERTICAL_PIPE;
	public isHorizontalPipe = (x: number, y: number): boolean => this.board[y-1][x-1] === SpriteTypeEnum.HORIZONTAL_PIPE
	public isConnectionPipe = (x: number, y: number): boolean => this.board[y-1][x-1] === SpriteTypeEnum.CONNECTION_PIPE;
	public isBlankBlock = (x: number, y: number): boolean => this.board[y-1][x-1] === SpriteTypeEnum.BLANK;

	private updateBlock = (block: number, x: number, y: number): void => {
		const sprite = this.sprites.find((spr: ISprite) => spr.key === `sprite-${ x }-${ y }`);
		if (!sprite) return;

		sprite.updateImage(ImageEnum[this.spriteName(block)]);
		sprite.updateType(SpriteTypeEnum[this.spriteName(block)]);
	}

	private xStart = (playerX: number): number => playerX - Math.floor(this.SPRITE_BLOCKS_WIDTH / 2) - 1;
	private yStart = (playerY: number): number => playerY - Math.floor(this.SPRITE_BLOCKS_HEIGHT / 2) - 1;

	private newBlock = (x: number, y: number, width: number, height: number, block: number): ISprite => {
		const type: string = SpriteTypeEnum[block];

		return new Sprite({
			key: `sprite-${ x }-${ y }`,
			visable: true,
			x: (x - 1) * width + 1,
			y: (y - 1) * height + 1,
			width,
			height,
			image: ImageEnum[this.spriteName(block)],
			type: SpriteTypeEnum[type],
			outline: false,
		})
	}

	private spriteName = (sprite: number) => `SPRITE${ sprite.toString().length === 1 ? '0' : '' }${ sprite }`;
}