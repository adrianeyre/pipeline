import IMonsterProps from './interfaces/monster-props';
import IMonster from './interfaces/monster';
import IBoard from './interfaces/board';
import DirectionEnum from './enums/direction-enum';
import PlayerResultEnum from './enums/player-result-enum';
import MonsterTypeEnum from './enums/monster-type-enum';

import monster01 from '../images/monster01.png';
import monster02 from '../images/monster02.png';

export default class Monster implements IMonster {
	public key: string;
	public visable: boolean;
	public outline: boolean;
	public x: number;
	public y: number;
	public blockX: number;
	public blockY: number
	public blocksWidth: number;
	public blocksHeight: number;
	public width: number;
	public height: number;
	public iteration: number;
	public zIndex: number
	public direction: DirectionEnum;
	public type: MonsterTypeEnum;
	public image: string;
	public isAlive: boolean;

	readonly MONSTER_ZINDEX: number = 6000;
	readonly playerImages: string[][] = [
		[monster01, monster02, monster01, monster02],
		[monster01, monster02, monster01, monster02],
		[monster01, monster02, monster01, monster02],
		[monster01, monster02, monster01, monster02],
	];

	constructor(config: IMonsterProps) {
		this.key = config.key;
		this.visable = config.visable;
		this.outline = false;
		this.iteration = 0;
		this.blockX = config.x;
		this.blockY = config.y;
		this.x = (config.x - 1) * config.width + 1;
		this.y = (config.y - 1) * config.height + 1;
		this.blocksWidth = config.blocksWidth;
		this.blocksHeight = config.blocksHeight;
		this.width = config.width;
		this.height = config.height;
		this.zIndex = this.MONSTER_ZINDEX;
		this.direction = config.direction;
		this.type = config.type;
		this.image = this.setImage();
		this.isAlive = true;
	}

	public move = (board: IBoard, playerX: number, playerY: number): PlayerResultEnum => {
		let x = this.blockX;
		let y = this.blockY;

		switch (this.direction) {
			case DirectionEnum.UP:
				y--; break;
			case DirectionEnum.RIGHT:
				x++; break;
			case DirectionEnum.DOWN:
				y++; break;
			case DirectionEnum.LEFT:
				x--; break;
		}

		if (board.isBlankBlock(x, y)) {
			this.blockX = x;
			this.blockY = y;
			this.updateImage();
			return this.moveMonstersWithPlayer(playerX, playerY);
		}

		this.changeDirection(board, this.blockX, this.blockY);
		return this.move(board, playerX, playerY);
	}

	public moveMonstersWithPlayer = (playerX: number, playerY: number): PlayerResultEnum => {
		const horizontalGap = Math.floor(this.blocksWidth / 2);
		const verticalGap = Math.floor(this.blocksHeight / 2);

		if (
			this.blockX >= playerX - horizontalGap &&
			this.blockX <= playerX + horizontalGap &&
			this.blockY >= playerY - verticalGap &&
			this.blockY < playerY + verticalGap
		) {
			this.visable = true;
			let x = playerX - horizontalGap;
			let y = playerY - verticalGap;
			this.x = (this.blockX - x) * this.width + 1;
			this.y = (this.blockY - y) * this.height + 1;
		} else {
			this.visable = false;
		}

		return playerX === this.blockX && playerY === this.blockY ? PlayerResultEnum.LOOSE_LIFE : PlayerResultEnum.SAFE;
	}

	private changeDirection = (board: IBoard, x: number, y: number): DirectionEnum => {
		if (this.type === MonsterTypeEnum.DIRECTIONAL) {
			const isUpBlank = board.isBlankBlock(x, y - 1);
			const isRightBlank = board.isBlankBlock(x + 1, y);
			const isDownBlank = board.isBlankBlock(x, y + 1);
			const isLeftBlank = board.isBlankBlock(x - 1, y);

			switch (this.direction) {
				case DirectionEnum.UP:
					if (isRightBlank) return this.direction = DirectionEnum.RIGHT;
					if (isLeftBlank) return this.direction = DirectionEnum.LEFT;
					return this.direction = DirectionEnum.DOWN;
				case DirectionEnum.RIGHT:
					if (isDownBlank) return this.direction = DirectionEnum.DOWN;
					if (isUpBlank) return this.direction = DirectionEnum.UP;
					return this.direction = DirectionEnum.LEFT;
				case DirectionEnum.DOWN:
					if (isLeftBlank) return this.direction = DirectionEnum.LEFT;
					if (isRightBlank) return this.direction = DirectionEnum.RIGHT;
					return this.direction = DirectionEnum.UP;
				case DirectionEnum.LEFT:
					if (isUpBlank) return this.direction = DirectionEnum.UP;
					if (isDownBlank) return this.direction = DirectionEnum.DOWN;
					return this.direction = DirectionEnum.RIGHT;
			}
		}

		switch (this.direction) {
			case DirectionEnum.UP:
				return this.direction = DirectionEnum.DOWN;
			case DirectionEnum.RIGHT:
				return this.direction = DirectionEnum.LEFT;
			case DirectionEnum.DOWN:
				return this.direction = DirectionEnum.UP;
			case DirectionEnum.LEFT:
				return this.direction = DirectionEnum.RIGHT;
			default:
				return DirectionEnum.RIGHT
		}
	}

	private updateImage = (): void => {
		this.image = this.setImage();
		this.iteration ++;
		if (this.iteration > 3) this.iteration = 0;
	}

	private setImage = (): string => this.playerImages[this.direction][this.iteration];
}
