import Player from './player';
import Board from './board';
import IGame from './interfaces/game';
import IPlayer from './interfaces/player';
import ISprite from './interfaces/sprite';
import IBoard from './interfaces/board';
import PlayerResultEnum from './enums/player-result-enum';
import DirectionEnum from './enums/direction-enum';
import SpriteTypeEnum from './enums/sprite-type-enum';
import IPipelineProps from '../components/pipeline/interfaces/pipeline-props';

export default class Game implements IGame {
	public player: IPlayer;
	public board: IBoard;
	public level: number;
	public timer: any;
	public monsterIteration: number;
	public boulderIteration: number;
	public playerTimeOut: number;
	public isGameInPlay: boolean;
	public timerInterval: number;
	public editing: boolean;
	public selectedSprite: SpriteTypeEnum;

	readonly DEFAULT_TIMER_INTERVAL: number = 50;
	readonly PLAYER_TIME_OUT: number = 20;
	readonly MONSTER_ITERATION: number = 5;
	readonly BOULDER_ITERATION: number = 2;
	
	constructor(config: IPipelineProps) {
		this.level = 1;
		this.player = new Player(config);
		this.board = new Board({ currentLevel: this.level, playerX: this.player.blockX, playerY: this.player.blockY });
		this.isGameInPlay = false;
		this.playerTimeOut = 0;
		this.monsterIteration = 0;
		this.boulderIteration = 0;
		this.timerInterval = this.DEFAULT_TIMER_INTERVAL;
		this.editing = false;
		this.selectedSprite = SpriteTypeEnum.BLANK;

		this.setupGame();
	}

	public handleInput = (playerResult: PlayerResultEnum, sprite?: ISprite): void => {
		switch (playerResult) {
			case PlayerResultEnum.SAFE:
			case PlayerResultEnum.PLAYER_MOVED:
				return;
			case PlayerResultEnum.STAR:
			case PlayerResultEnum.GRASS:
				this.board.setBlock(SpriteTypeEnum.BLANK, this.player.blockX, this.player.blockY); break;
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
			case PlayerResultEnum.SELECT_SPRITE:
				this.selectSprite(sprite); break;
			case PlayerResultEnum.BOLDER_MOVED:
				this.board.boulderDrop(this.player.blockX, this.player.blockY); break;
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

		this.monsterIteration ++;

		if (this.monsterIteration >= this.MONSTER_ITERATION) {
			this.monsterIteration = 0;
			this.handleInput(this.board.moveMonstersWithTimer(this.player.blockX, this.player.blockY));
		}

		this.boulderIteration ++;

		if (this.boulderIteration >= this.BOULDER_ITERATION) {
			this.boulderIteration = 0;
			this.board.boulderDrop(this.player.blockX, this.player.blockY);
		}
	}

	private setupGame = async (): Promise<void> => {
		await this.board.getBoard();
		await this.player.setStartPosition(this.board.startX, this.board.startY);
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

		this.board.setBlock(this.selectedSprite, sprite.blockX, sprite.blockY);
		this.board.updateBoard(this.player.blockX, this.player.blockY);
	}

	private selectSprite = (sprite?: ISprite): void => {
		if (!sprite || !this.editing) return;

		this.selectedSprite = sprite.type;
	}
}
