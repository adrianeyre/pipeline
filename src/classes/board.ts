import IBoard from './interfaces/board';
import ISprite from './interfaces/sprite';
import Sprite from './sprite';
import SpriteTypeEnum from './enums/sprite-type-enum';
import ImageEnum from './enums/image-enum';

import * as boardData from './data/levels';
import StriteTypeEnum from './enums/sprite-type-enum';

export default class Board implements IBoard {
	public board: number[][];

	readonly SPRITE_BLOCKS_WIDTH: number = 12;
	readonly SPRITE_BLOCKS_HEIGHT: number = 12;
	readonly X_OFFSET: number = 3;
	readonly Y_OFFSET: number = 3;

	constructor() {
		this.board = boardData.default[0];
	}

	public setBoard = (sprites: ISprite[], playerX: number, playerY: number): ISprite[] => {
		sprites = [];
		let xPos = this.xStart(playerX);
		let yPos = this.yStart(playerY);

		for(let y = 1; y <= this.SPRITE_BLOCKS_HEIGHT; y++) {
			for(let x = 1; x <= this.SPRITE_BLOCKS_WIDTH; x++) {
				sprites.push(this.newBlock(x, y, this.board[yPos][xPos]));
				xPos ++;
			}
			xPos = this.xStart(playerX);
			yPos ++;
		}

		return sprites;
	}

	public updateBoard = (sprites: ISprite[], playerX: number, playerY: number): ISprite[] => {
		let xPos = this.xStart(playerX);
		let yPos = this.yStart(playerY);

		for(let y = 1; y <= this.SPRITE_BLOCKS_HEIGHT; y++) {
			for(let x = 1; x <= this.SPRITE_BLOCKS_WIDTH; x++) {
				this.updateBlock(this.board[yPos][xPos], x, y, sprites);
				xPos ++;
			}
			xPos = this.xStart(playerX);
			yPos ++;
		}

		return sprites;
	}

	public validate = (x: number, y: number): StriteTypeEnum => {
		const sprite = this.board[y-1][x-1];
		return StriteTypeEnum[this.spriteName(sprite)];
	}

	public setBlock = (block: number, x: number, y: number): number => this.board[y-1][x-1] = block;

	private updateBlock = (block: number, x: number, y: number, sprites: ISprite[]): void => {
		const sprite = sprites.find((spr: ISprite) => spr.key === `sprite-${ x }-${ y }`);
		if (!sprite) return;

		sprite.updateImage(ImageEnum[this.spriteName(block)]);
		sprite.updateType(SpriteTypeEnum[this.spriteName(block)]);
	}

	private xStart = (playerX: number): number => playerX - Math.floor(this.SPRITE_BLOCKS_WIDTH / 2) - 1;
	private yStart = (playerY: number): number => playerY - Math.floor(this.SPRITE_BLOCKS_HEIGHT / 2) - 1;

	private newBlock = (x: number, y: number, block: number): ISprite => new Sprite({
		key: `sprite-${ x }-${ y }`,
		visable: true,
		x: (x - 1) * this.X_OFFSET + 1,
		y: (y - 1) * this.Y_OFFSET + 1,
		width: 3,
		height: 3,
		image: ImageEnum[this.spriteName(block)],
		type:  SpriteTypeEnum[this.spriteName(block)],
	});

	private spriteName = (sprite: number) => `SPRITE${ sprite.toString().length === 1 ? '0' : '' }${ sprite }`;
}