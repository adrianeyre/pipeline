import IPlayerProps from './interfaces/player-props';

import IPlayer from './interfaces/player';
import IBoard from './interfaces/board';
import ISprite from './interfaces/sprite';
import DirectionEnum from './enums/direction-enum';
import PlayerResultEnum from './enums/player-result-enum';
import StriteTypeEnum from './enums/sprite-type-enum';

import playerStand1 from '../images/player-stand1.png';
import playerStand2 from '../images/player-stand2.png';
import playerStand3 from '../images/player-stand3.png';
import playerVertical1 from '../images/player-vertical1.png';
import playerVertical2 from '../images/player-vertical2.png';
import playerLeft1 from '../images/player-left1.png';
import playerLeft2 from '../images/player-left2.png';
import playerLeft3 from '../images/player-left3.png';
import playerLeft4 from '../images/player-left4.png';
import playerRight1 from '../images/player-right1.png';
import playerRight2 from '../images/player-right2.png';
import playerRight3 from '../images/player-right3.png';
import playerRight4 from '../images/player-right4.png';

export default class Player implements IPlayer {
	public key: string;
	public visable: boolean;
	public x: number;
	public y: number;
	public blockX: number;
	public blockY: number
	public width: number;
	public height: number;
	public iteration: number;
	public zIndex: number
	public direction: DirectionEnum;
	public score: number;
	public lives: number;
	public image: string;
	public isAlive: boolean;

	readonly STAR_POINTS: number = 10;
	readonly INITIAL_PLAYER_LIVES: number = 3;
	readonly INITIAL_PLAYER_X: number = 7;
	readonly INITIAL_PLAYER_Y: number = 7;
	readonly PLAYER_WIDTH: number = 3;
	readonly PLATER_HEIGHT: number = 3;
	readonly PLAYER_ZINDEX: number = 6000;
	readonly playerImages: string[][] = [
		[playerVertical1, playerVertical2, playerVertical1, playerVertical2],
		[playerRight1, playerRight2, playerRight3, playerRight4],
		[playerVertical1, playerVertical2, playerVertical1, playerVertical2],
		[playerLeft1, playerLeft2, playerLeft3, playerLeft4],
		[playerStand1, playerStand2, playerStand1, playerStand3],
	];

	constructor(config: IPlayerProps) {
		this.key = 'player';
		this.visable = true;
		this.iteration = 0;
		this.x = (this.INITIAL_PLAYER_X - 1 ) * this.PLAYER_WIDTH + 1;
		this.y = (this.INITIAL_PLAYER_Y - 1 ) * this.PLATER_HEIGHT + 1;
		this.blockX = this.INITIAL_PLAYER_X;
		this.blockY = this.INITIAL_PLAYER_Y ;
		this.width = this.PLAYER_WIDTH;
		this.height = this.PLATER_HEIGHT;
		this.zIndex = this.PLAYER_ZINDEX;
		this.direction = DirectionEnum.STAND;
		this.score = 0;
		this.lives = config.initialPlayerLives || this.INITIAL_PLAYER_LIVES;
		this.image = this.setImage();
		this.isAlive = true;
	}
	
	public move = (direction: DirectionEnum, board: IBoard, sprites: ISprite[]): PlayerResultEnum => {
		this.direction = direction;

		let x = this.blockX;
		let y = this.blockY;

		switch (direction) {
			case DirectionEnum.UP:
				y --; break;
			case DirectionEnum.RIGHT:
				x ++; break;
			case DirectionEnum.DOWN:
				y ++; break;
			case DirectionEnum.LEFT:
				x --; break;
		}

		const result = board.validate(x, y);

		switch (result) {
			case StriteTypeEnum.SPRITE00:
				this.movePlayer(x, y); break;
			case StriteTypeEnum.SPRITE02:
				this.addStarPoints(); this.movePlayer(x, y); return PlayerResultEnum.STAR;
			case StriteTypeEnum.SPRITE03:
				this.moveBolder(x, y, direction, board, sprites); break;
		}

		return PlayerResultEnum.SAFE;
	}

	private movePlayer = (x: number, y: number): void => {
		this.blockX = x;
		this.blockY = y;
		this.image = this.setImage();
		this.iteration ++;
		if (this.iteration > 3) this.iteration = 0;
	}

	private moveBolder = (x: number, y: number, direction: DirectionEnum, board: IBoard, sprites: ISprite[]): void => {
		const result = board.moveBolder(x, y, direction, sprites);

		if (result === PlayerResultEnum.BOLDER_MOVED) this.movePlayer(x, y);
	}

	private addStarPoints = () => this.score += this.STAR_POINTS;

	private setImage = (): string => this.playerImages[this.direction][this.iteration];
}
