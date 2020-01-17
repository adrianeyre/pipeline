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
import sprite17 from '../images/sprite17.png';
import sprite18 from '../images/sprite18.png';
import sprite19 from '../images/sprite19.png';
import sprite20 from '../images/sprite20.png';
import sprite21 from '../images/sprite21.png';
import sprite22 from '../images/sprite22.png';
import sprite23 from '../images/sprite23.png';
import sprite24 from '../images/sprite24.png';
import sprite25 from '../images/sprite25.png';
import sprite26 from '../images/sprite26.png';
import sprite27 from '../images/sprite27.png';
import sprite28 from '../images/sprite28.png';
import sprite29 from '../images/sprite29.png';
import sprite30 from '../images/sprite30.png';
import sprite31 from '../images/sprite31.png';
import sprite32 from '../images/sprite32.png';
import sprite33 from '../images/sprite33.png';
import sprite34 from '../images/sprite34.png';
import sprite35 from '../images/sprite35.png';
import sprite36 from '../images/sprite36.png';
import sprite37 from '../images/sprite37.png';
import sprite38 from '../images/sprite38.png';
import sprite39 from '../images/sprite39.png';
import sprite40 from '../images/sprite40.png';
import sprite41 from '../images/sprite41.png';
import sprite42 from '../images/sprite42.png';
import sprite43 from '../images/sprite43.png';
import player from '../images/player.png';

export default class Sprite implements ISprite {
	public key: string;
	public visable: boolean;
	public outline: boolean;
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
		sprite12, sprite13, sprite14, sprite15, sprite16, sprite17,
		sprite18, sprite19, sprite20, sprite21, sprite22, sprite23,
		sprite24, sprite25, sprite26, sprite27, sprite28, sprite29,
		sprite30, sprite31, sprite32, sprite33, sprite34, sprite35,
		sprite36, sprite37, sprite38, sprite39, sprite40, sprite41,
		sprite42, sprite43,
		player,
	}

	constructor(config: ISpriteProps) {
		this.key = config.key;
		this.visable = config.visable;
		this.outline = config.outline;
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
