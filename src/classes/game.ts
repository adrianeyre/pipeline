import Player from './player';
import Board from './board';
import IGame from './interfaces/game';
import IPlayer from './interfaces/player';
import ISprite from './interfaces/sprite';
import IBoard from './interfaces/board';
import PlayerResultEnum from './enums/player-result-enum';
import DirectionEnum from './enums/direction-enum';
import IPipelineProps from '../components/pipeline/interfaces/pipeline-props';

export default class Game implements IGame {
	public player: IPlayer;
	public board: IBoard;
	public level: number;
	public timer: any;
	public iteration: number;
	public playerTimeOut: number;
	public isGameInPlay: boolean;
	public timerInterval: number;
	public editing: boolean;

	readonly DEFAULT_TIMER_INTERVAL: number = 50;
	readonly PLAYER_TIME_OUT: number = 20;
	readonly MONSTER_ITERATION: number = 5;
	
	constructor(config: IPipelineProps) {
		this.level = 1;
		this.player = new Player(config);
		this.board = new Board({ currentLevel: this.level, playerX: this.player.blockX, playerY: this.player.blockY });
		this.isGameInPlay = false;
		this.playerTimeOut = 0;
		this.iteration = 0;
		this.timerInterval = this.DEFAULT_TIMER_INTERVAL;
		this.editing = false;

		this.player.setStartPosition(this.board.startX, this.board.startY);
	}

	public handleInput = (playerResult: PlayerResultEnum, sprite?: ISprite): void => {
		switch (playerResult) {
			case PlayerResultEnum.SAFE:
			case PlayerResultEnum.PLAYER_MOVED:
				return;
			case PlayerResultEnum.STAR:
				this.board.setBlock(0, this.player.blockX, this.player.blockY); break;
			case PlayerResultEnum.ARROW_UP:
				this.movePlayer(DirectionEnum.UP); break;
			case PlayerResultEnum.ARROW_DOWN:
				this.movePlayer(DirectionEnum.DOWN); break;
			case PlayerResultEnum.ARROW_RIGHT:
				this.movePlayer(DirectionEnum.RIGHT); break;
			case PlayerResultEnum.ARROW_LEFT:
				this.movePlayer(DirectionEnum.LEFT); break;
			case PlayerResultEnum.SPACE_BAR:
				this.board.inventory.moveSlot(); break;
			case PlayerResultEnum.ENTER:
				this.dropItem(); break;
			case PlayerResultEnum.LOOSE_LIFE:
				this.looseLife(); break;
			case PlayerResultEnum.DEAD:
				this.dead(); break;
			case PlayerResultEnum.EDITING:
				this.toggleEditing(); break
			case PlayerResultEnum.EDIT_SPRITE:
				this.editSprite(sprite); break
		}
	}

	public handleTimer = (): void => {
		if (this.editing) return;

		this.playerTimeOut ++;
		if (!this.player.inPipe && this.playerTimeOut >= this.PLAYER_TIME_OUT) {
			this.playerTimeOut = 0;
			this.player.move(DirectionEnum.STAND, this.board, this.editing)
		}

		if (this.player.inPipe) this.updateBoard(this.player.direction);

		this.iteration ++;

		if (this.iteration >= this.MONSTER_ITERATION) {
			this.iteration = 0;
			this.handleInput(this.board.moveMonstersWithTimer(this.player.blockX, this.player.blockY));
		}
	}

	private movePlayer = (direction: DirectionEnum): void => {
		this.playerTimeOut = 0;

		if (!this.player.inPipe) this.updateBoard(direction);
	}

	private updateBoard = (direction: DirectionEnum): void => {
		if (this.editing) {
			this.player.move(direction, this.board, this.editing);
			this.board.updateBoard(this.player.blockX, this.player.blockY);
			return;
		}

		const playerResult = this.player.move(direction, this.board, this.editing);
		const monsterResult = this.board.moveMonstersWithPlayer(this.player.blockX, this.player.blockY);
		this.board.updateBoard(this.player.blockX, this.player.blockY);
		this.handleInput(playerResult);
		this.handleInput(monsterResult);
	}

	private looseLife = (): void => {
		const result = this.player.looseLife();
		this.board.updateBoard(this.player.blockX, this.player.blockY);
		if (result === PlayerResultEnum.DEAD) this.dead();
	}

	private dead = (): void => {
		this.isGameInPlay = false;
	}

	private dropItem = (): void => {
		const item = this.board.inventory.drop();

		if (item) {
			const hasDropped = this.board.dropItem(item, this.player.blockX, this.player.blockY, this.player.direction);
			if (hasDropped) this.board.inventory.remove(item);
		}
	}

	private toggleEditing = async (): Promise<void> => {
		this.editing = !this.editing;

		if (this.editing) {
			await this.board.readLevel();
			this.board.updateBoard(this.player.blockX, this.player.blockY);
		}
	}

	private editSprite = (sprite?: ISprite) => {
		if (!sprite || !this.editing) return;

		this.board.setBlock(99, sprite.blockX, sprite.blockY);
		this.board.updateBoard(this.player.blockX, this.player.blockY);
	}
}
