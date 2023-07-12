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
	public slot: number;
	public maxItems: number;

	readonly WIDTH: number = 1;
	readonly HEIGHT: number = 1
	readonly X_OFFSET: number = 8;
	readonly BLANK: number = 0;
	readonly MAX_ITEMS: number = 3;

	constructor(config: IInventoryProps) {
		this.spriteBlockWidth = config.spriteBlockWidth;
		this.spriteBlockHeight = config.spriteBlockHeight;
		this.spriteWidth = config.spriteWidth;
		this.spriteHeight = config.spriteHeight;
		this.sprites = [];
		this.count = 0;
		this.slot = 1;
		this.maxItems = config.maxItems ? config.maxItems : this.MAX_ITEMS;

		this.setupInventory();
		this.setSlot(ImageEnum.PLAYER);
	}

	public addItem = (block: SpriteTypeEnum): PlayerResultEnum => {
		const sprite = this.sprites.find((spr: ISprite) => spr.key.substring(0, 10) === `inventory-` && spr.type === SpriteTypeEnum.BLANK);
		if (!sprite) return PlayerResultEnum.INVENTORY_FULL;

		sprite.updateType(block);
		// @ts-ignore
		sprite.updateImage(ImageEnum[this.spriteName(block)]);

		return PlayerResultEnum.INVENTORY_ADDED;
	}

	public useItem = (block: SpriteTypeEnum): PlayerResultEnum => {
		const sprite = this.sprites.find((spr: ISprite) => spr.key === `inventory-${ this.slot }` && spr.type === block);
		if (!sprite) return PlayerResultEnum.NOT_IN_INVENTORY;

		sprite.updateImage(ImageEnum.SPRITE00);
		sprite.updateType(SpriteTypeEnum.BLANK);

		return PlayerResultEnum.INVENTORY_USED;
	}

	public moveSlot = (): void => {
		this.setSlot(ImageEnum.SPRITE00);
		this.slot ++;
		if (this.slot > this.MAX_ITEMS) this.slot = 1;
		this.setSlot(ImageEnum.PLAYER);
	}

	public drop = (): SpriteTypeEnum | null => {
		const sprite = this.sprites.find((spr: ISprite) => spr.key === `inventory-${ this.slot }`);
		if (!sprite || sprite.type === SpriteTypeEnum.BLANK) return null;

		return sprite.type;
	}

	public remove = (type: SpriteTypeEnum): void => {
		const sprite = this.sprites.find((spr: ISprite) => spr.type === type);
		if (!sprite) return;

		sprite.updateImage(ImageEnum.SPRITE00);
		sprite.updateType(SpriteTypeEnum.BLANK);
	}

	private setSlot = (image: ImageEnum): void => {
		const sprite = this.sprites.find((spr: ISprite) => spr.key === `selected-inventory-${ this.slot }`);
		if (!sprite) return;

		sprite.updateImage(image);
	}

	private setupInventory = (): void => {
		let count = 0;
		for (let x = 1; x <= this.MAX_ITEMS * 2; x += 2) {
			count ++;
			this.sprites.push(this.newBlock(`selected-inventory-${ count }`, x * 2, this.WIDTH, this.HEIGHT, this.BLANK, false));
			this.sprites.push(this.newBlock(`inventory-${ count }`, x * 2 + 1, this.WIDTH, this.HEIGHT, this.BLANK, true));
		}
	}

	private newBlock = (key: string, x: number, width: number, height: number, block: number, outline: boolean): ISprite => {
		const type: string = SpriteTypeEnum[block];

		return new Sprite({
			key,
			visable: true,
			x: x + this.X_OFFSET,
			y: 0,
			width,
			height,
			blockX: 0,
			blockY: 0,
			// @ts-ignore
			image: ImageEnum[this.spriteName(block)],
			// @ts-ignore
			type: SpriteTypeEnum[type],
			outline,
		})
	};

	private spriteName = (sprite: number): string => `SPRITE${ sprite.toString().length === 1 ? '0' : '' }${ sprite }`;
}