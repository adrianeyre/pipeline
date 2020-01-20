import IPlayerProps from './interfaces/player-props';
import IPlayer from './interfaces/player';
import IBoard from './interfaces/board';
import DirectionEnum from './enums/direction-enum';
import PlayerResultEnum from './enums/player-result-enum';
import SpriteTypeEnum from './enums/sprite-type-enum';

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
	public outline: boolean;
	public x: number;
	public y: number;
	public blockX: number;
	public blockY: number
	public startX: number;
	public startY: number;
	public width: number;
	public height: number;
	public iteration: number;
	public zIndex: number
	public direction: DirectionEnum;
	public score: number;
	public lives: number;
	public image: string;
	public isAlive: boolean;
	public inPipe: boolean;

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
		this.outline = false;
		this.iteration = 0;
		this.x = (this.INITIAL_PLAYER_X - 1 ) * this.PLAYER_WIDTH + 1;
		this.y = (this.INITIAL_PLAYER_Y - 1 ) * this.PLATER_HEIGHT + 1;
		this.blockX = this.INITIAL_PLAYER_X;
		this.blockY = this.INITIAL_PLAYER_Y;
		this.startX = 0;
		this.startY = 0;
		this.width = this.PLAYER_WIDTH;
		this.height = this.PLATER_HEIGHT;
		this.zIndex = this.PLAYER_ZINDEX;
		this.direction = DirectionEnum.STAND;
		this.score = 0;
		this.lives = config.initialPlayerLives || this.INITIAL_PLAYER_LIVES;
		this.image = this.setImage();
		this.isAlive = true;
		this.inPipe = false;
	}

	public setStartPosition = (x: number, y: number): void => {
		this.blockX = x;
		this.blockY = y;
		this.startX = x;
		this.startY = y;
	}

	public looseLife = (): PlayerResultEnum => {
		this.lives --;
		this.inPipe = false;
		this.resetStartPosition();

		return this.lives < 1 ? PlayerResultEnum.DEAD : PlayerResultEnum.SAFE
	}
	
	public move = (direction: DirectionEnum, board: IBoard, editing: boolean): PlayerResultEnum => {
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

		if (!this.playerInBoundaries(x, y, board)) return PlayerResultEnum.SAFE;

		if (editing) {
			this.movePlayer(x, y);
			return PlayerResultEnum.SAFE;
		}

		const block = board.validate(x, y);
		let result = PlayerResultEnum.SAFE;

		switch (block) {
			case SpriteTypeEnum.BLANK:
				this.moveToBlank(x, y); break;
			case SpriteTypeEnum.POINTS:
				this.addStarPoints(); this.movePlayer(x, y); result = PlayerResultEnum.STAR; break;
			case SpriteTypeEnum.GRASS:
				this.movePlayer(x, y); result = PlayerResultEnum.GRASS; break;
			case SpriteTypeEnum.BOULDER:
				this.moveBoulder(x, y, direction, board, block); result = PlayerResultEnum.BOLDER_MOVED; break;
			case SpriteTypeEnum.DROP_BOULDER:
				result = this.moveDropBoulder(x, y, direction, board, block); break
			case SpriteTypeEnum.HORIZONTAL_PIPE:
			case SpriteTypeEnum.VERTICAL_PIPE:
			case SpriteTypeEnum.CONNECTION_PIPE:
				this.movePipe(x, y, direction, board); break;
			case SpriteTypeEnum.TELEPORT01:
			case SpriteTypeEnum.TELEPORT02:
			case SpriteTypeEnum.TELEPORT03:
			case SpriteTypeEnum.TELEPORT04:
			case SpriteTypeEnum.TELEPORT05:
			case SpriteTypeEnum.TELEPORT06:
			case SpriteTypeEnum.TELEPORT07:
			case SpriteTypeEnum.TELEPORT08:
			case SpriteTypeEnum.TELEPORT09:
			case SpriteTypeEnum.TELEPORT10:
				this.teleport(x, y, board, block); break;
			case SpriteTypeEnum.WALL:
			case SpriteTypeEnum.WALL01:
			case SpriteTypeEnum.WALL02:
			case SpriteTypeEnum.WALL03:
			case SpriteTypeEnum.WALL04:
				this.useAxe(x, y, board, block); break;
			case SpriteTypeEnum.RED_GATE:
			case SpriteTypeEnum.BLUE_GATE:
			case SpriteTypeEnum.LIGHT_GREEN_GATE:
			case SpriteTypeEnum.YELLOW_GATE:
			case SpriteTypeEnum.PURPLE_GATE:
			case SpriteTypeEnum.LIGHT_BLUE_GATE:
			case SpriteTypeEnum.WHITE_GATE:
			case SpriteTypeEnum.BROWN_GATE:
			case SpriteTypeEnum.GREY_GATE:
			case SpriteTypeEnum.GREEN_GATE:
				this.openGate(x, y, board, block); break;
			case SpriteTypeEnum.RED_KEY:
			case SpriteTypeEnum.BLUE_KEY:
			case SpriteTypeEnum.LIGHT_GREEN_KEY:
			case SpriteTypeEnum.YELLOW_KEY:
			case SpriteTypeEnum.PURPLE_KEY:
			case SpriteTypeEnum.LIGHT_BLUE_KEY:
			case SpriteTypeEnum.WHITE_KEY:
			case SpriteTypeEnum.BROWN_KEY:
			case SpriteTypeEnum.GREY_KEY:
			case SpriteTypeEnum.GREEN_KEY:
			case SpriteTypeEnum.AXE:
				this.addInventory(x, y, board, block); break;
			case SpriteTypeEnum.SKULL:
				result = PlayerResultEnum.LOOSE_LIFE; break;
		}

		return result;
	}

	private playerInBoundaries = (x: number, y: number, board: IBoard): boolean =>
		x > board.xMargin &&
		x <= board.boardWidth - board.xMargin &&
		y > board.yMargin &&
		y <= board.boardHeight - board.yMargin;

	private moveToBlank = (x: number, y: number): PlayerResultEnum => {
		this.inPipe = false;
		this.showPlayer();
		this.movePlayer(x, y);
		return PlayerResultEnum.PLAYER_MOVED;
	}

	private movePlayer = (x: number, y: number): void => {
		this.blockX = x;
		this.blockY = y;
		this.image = this.setImage();
		this.iteration ++;
		if (this.iteration > 3) this.iteration = 0;
	}

	private moveBoulder = (x: number, y: number, direction: DirectionEnum, board: IBoard, block: SpriteTypeEnum): void => {
		const result = board.moveBoulder(block, x, y, direction);

		if (result === PlayerResultEnum.BOLDER_MOVED) this.movePlayer(x, y);
	}

	private moveDropBoulder = (x: number, y: number, direction: DirectionEnum, board: IBoard, block: SpriteTypeEnum): PlayerResultEnum => {
		if (direction === DirectionEnum.UP) return PlayerResultEnum.SAFE;
		const result = board.moveBoulder(block, x, y, direction);

		if (result === PlayerResultEnum.BOLDER_MOVED) this.movePlayer(x, y);
		return result;
	}

	private useAxe = (x: number, y: number, board: IBoard, block: number) => {
		if (board.inventory.useItem(SpriteTypeEnum.AXE) === PlayerResultEnum.INVENTORY_USED) {
			board.setBlock(0, x, y);
			this.movePlayer(x, y);
		}
	}

	private addInventory = (x: number, y: number, board: IBoard, block: number) => {
		const result = board.inventory.addItem(block);
		if (result === PlayerResultEnum.INVENTORY_ADDED) board.setBlock(0, x, y);
		this.movePlayer(x, y);
	}

	private openGate = (x: number, y: number, board: IBoard, block: number) => {
		const result = board.inventory.useItem(block + 10);
		if (result === PlayerResultEnum.INVENTORY_USED) {
			board.setBlock(0, x, y);
			this.movePlayer(x, y);
		}
	}

	private movePipe = (x: number, y: number, direction: DirectionEnum, board: IBoard): void => {
		let isDirectionHorizontal = false,
			isDirectionVertical = false;

		const isConnectionPipe = this.isConnectionPipe(x, y, board);
		const isLeftHorizontalPipe = this.isHorizontalPipe(x - 1, y, board);
		const isRightHorizontalPipe = this.isHorizontalPipe(x + 1, y, board);
		const isUpVertialPipe = this.isVerticalPipe(x, y - 1, board);
		const isDownVertialPipe = this.isVerticalPipe(x, y + 1, board);
		const isVerticalPipe = this.isVerticalPipe(x, y, board);
		const isHorizontalPipe = this.isHorizontalPipe(x, y, board);

		switch (direction) {
			case DirectionEnum.UP:
			case DirectionEnum.DOWN:
				isDirectionVertical = true; break;
			case DirectionEnum.RIGHT:
			case DirectionEnum.LEFT:
				isDirectionHorizontal = true; break;
		}

		if ((this.inPipe && isDirectionHorizontal && isVerticalPipe) || (this.inPipe && isDirectionVertical && isHorizontalPipe)) {
			this.movePlayer(x, y);
			this.hidePlayer();
		}

		if ((isVerticalPipe && isDirectionVertical) || (isHorizontalPipe && isDirectionHorizontal)) {
			this.inPipe = true;
			this.movePlayer(x, y);
			this.hidePlayer();
		}

		if (isConnectionPipe) {
			let direction = -1;
			this.movePlayer(x, y);
			if (isDirectionVertical && isLeftHorizontalPipe) direction = DirectionEnum.LEFT;
			if (isDirectionVertical && isRightHorizontalPipe) direction = DirectionEnum.RIGHT;
			if (isDirectionHorizontal && isUpVertialPipe) direction = DirectionEnum.UP;
			if (isDirectionHorizontal && isDownVertialPipe) direction = DirectionEnum.DOWN;

			if (direction < 0) {
				switch (this.direction) {
					case DirectionEnum.UP:
						direction = DirectionEnum.DOWN; break;
					case DirectionEnum.DOWN:
						direction = DirectionEnum.UP; break;
					case DirectionEnum.RIGHT:
						direction = DirectionEnum.LEFT; break;
					case DirectionEnum.LEFT:
						direction = DirectionEnum.RIGHT; break;
				}
			}

			this.move(direction, board, false);
		}
	}

	private teleport = (x: number, y: number, board: IBoard, block: SpriteTypeEnum): void => {
		if (this.direction === DirectionEnum.STAND) return;
		const { xPos, yPos } = board.teleport(x, y, block);

		if (xPos && yPos) this.movePlayer(xPos, yPos);
	}

	private resetStartPosition = (): void => {
		this.blockX = this.startX;
		this.blockY = this.startY;
	}

	private isVerticalPipe = (x: number, y: number, board: IBoard): boolean => board.isMyBlock(x, y, SpriteTypeEnum.VERTICAL_PIPE);
	private isHorizontalPipe = (x: number, y: number, board: IBoard): boolean => board.isMyBlock(x, y, SpriteTypeEnum.HORIZONTAL_PIPE);
	private isConnectionPipe = (x: number, y: number, board: IBoard): boolean => board.isMyBlock(x, y, SpriteTypeEnum.CONNECTION_PIPE);
	private hidePlayer = (): boolean => this.visable = false;
	private showPlayer = (): boolean => this.visable = true;
	private addStarPoints = () => this.score += this.STAR_POINTS;
	private setImage = (): string => this.playerImages[this.direction][this.iteration];
}
