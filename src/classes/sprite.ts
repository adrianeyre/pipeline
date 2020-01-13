import ISpriteProps from './interfaces/sprite-props';
import ISprite from './interfaces/sprite';
import SpriteTypeEnum from './enums/sprite-type-enum';
import ImageEnum from './enums/image-enum';

import sprite00 from '../images/sprite00.png'
import sprite01 from '../images/sprite01.png'
import sprite02 from '../images/sprite02.png'
import sprite03 from '../images/sprite03.png'

export default class Sprite implements ISprite {
	public key: string;
	public visable: boolean;
	public x: number;
	public y: number;
	public width: number;
	public height: number;
	public zIndex: number;
	public image: string;
	public type: SpriteTypeEnum;

	readonly Z_INDEX: number = 5000;
	readonly playerImages = {
		sprite00,
		sprite01,
		sprite02,
		sprite03,
	}

	constructor(config: ISpriteProps) {
		this.key = config.key;
		this.visable = config.visable;
		this.x = config.x;
		this.y = config.y;
		this.width = config.width;
		this.height = config.height;
		this.zIndex = this.Z_INDEX;
		this.image = this.playerImages[config.image];
		this.type = config.type;
	}

	public updateImage = (image: ImageEnum): string => this.image = this.playerImages[image];
	public updateType = (type: SpriteTypeEnum): SpriteTypeEnum => this.type = type;
}
