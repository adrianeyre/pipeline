import IInventory from './interfaces/inventory';
import IInventoryProps from './interfaces/inventory-props';
import SpriteTypeEnum from './enums/sprite-type-enum';
import PlayerResultEnum from './enums/player-result-enum';
import ImageEnum from './enums/image-enum';
import ISprite from './interfaces/sprite';
import Sprite from './sprite';

export default class Inventory implements IInventory {
	public spriteBlockWidth: number;
	public spriteBlockHeight: number;
	public spriteWidth: number;
	public spriteHeight: number;
	public sprites: ISprite[];
	public count: number;

	readonly WIDTH: number = 1;
	readonly HEIGHT: number = 1
	readonly BLANK: number = 0;
	readonly MAX_ITEMS: number = 18;

	constructor(config: IInventoryProps) {
		this.spriteBlockWidth = config.spriteBlockWidth;
		this.spriteBlockHeight = config.spriteBlockHeight;
		this.spriteWidth = config.spriteWidth;
		this.spriteHeight = config.spriteHeight;
		this.sprites = [];
		this.count = 0;

		this.setupInventory();
	}

	public addItem = (block: SpriteTypeEnum): PlayerResultEnum => {
		if (this.count >= this.MAX_ITEMS) return PlayerResultEnum.INVENTORY_FULL;

		this.count++;
		const sprite = this.sprites.find((spr: ISprite) => spr.key === `inventory-${ this.count }`);
		if (!sprite) throw new Error('Inventory sprite not found!');

		sprite.updateType(block);
		sprite.updateImage(ImageEnum[this.spriteName(block)]);

		return PlayerResultEnum.INVENTORY_ADDED;
	}

	public useItem = (block: SpriteTypeEnum): PlayerResultEnum => {
		const sprite = this.sprites.find((spr: ISprite) => spr.type === block);
		if (!sprite) return PlayerResultEnum.NOT_IN_INVENTORY;
		const spriteIndex = this.sprites.indexOf(sprite);

		for (let x=spriteIndex; x < this.count; x++) {
			this.sprites[spriteIndex].updateType(this.sprites[spriteIndex+1].type);
			this.sprites[spriteIndex].updateImage(ImageEnum[this.spriteName(this.sprites[spriteIndex+1].type)]);
		}

		this.sprites[this.count - 1].updateType(SpriteTypeEnum.BLANK);
		this.sprites[this.count - 1].updateImage(ImageEnum.SPRITE00);

		this.count--;

		return PlayerResultEnum.INVENTORY_USED;
	}

	private setupInventory = () => {
		let count = 0;
		for (let x = 1; x <= this.spriteBlockWidth * this.spriteWidth; x += 2) {
			count ++;
			this.sprites.push(this.newBlock(count, x, this.spriteBlockHeight * this.spriteHeight + 1, this.WIDTH, this.HEIGHT, this.BLANK));
		}
	}

	private newBlock = (count: number, x: number, y: number, width: number, height: number, block: number): ISprite => {
		const type: string = SpriteTypeEnum[block];

		return new Sprite({
			key: `inventory-${ count }`,
			visable: true,
			x: (x - 1) * width + 1,
			y: (y - 1) * height + 1,
			width,
			height,
			image: ImageEnum[this.spriteName(block)],
			type: SpriteTypeEnum[type],
			outline: true,
		})
	};

	private spriteName = (sprite: number) => `SPRITE${ sprite.toString().length === 1 ? '0' : '' }${ sprite }`;
}