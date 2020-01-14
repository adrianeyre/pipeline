import ISpriteProps from './interfaces/sprite-props';
import ISprite from './interfaces/sprite';
import SpriteTypeEnum from './enums/sprite-type-enum';
import ImageEnum from './enums/image-enum';

import sprite00 from '../images/sprite00.png';
import sprite01 from '../images/sprite01.png';
import sprite02 from '../images/sprite02.png';
import sprite03 from '../images/sprite03.png';
import sprite04 from '../images/sprite04.png';
import sprite05 from '../images/sprite05.png';
import sprite06 from '../images/sprite06.png';
import sprite07 from '../images/sprite07.png';
import sprite08 from '../images/sprite08.png';
import sprite09 from '../images/sprite09.png';
import sprite10 from '../images/sprite10.png';
import sprite11 from '../images/sprite11.png';
import sprite12 from '../images/sprite12.png';
import sprite13 from '../images/sprite13.png';
import sprite14 from '../images/sprite14.png';
import sprite15 from '../images/sprite15.png';
import sprite16 from '../images/sprite16.png';

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
		sprite00, sprite01, sprite02, sprite03, sprite04, sprite05,
		sprite06, sprite07, sprite08, sprite09, sprite10, sprite11,
		sprite12, sprite13, sprite14, sprite15, sprite16,
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
