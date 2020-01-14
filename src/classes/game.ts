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
	public playerTimeOut: number;
	public isGameInPlay: boolean;
	public timerInterval: number;

	readonly DEFAULT_TIMER_INTERVAL: number = 50;
	readonly PLAYER_TIME_OUT: number = 20;
	
	constructor(config: IPipelineProps) {
		this.player = new Player(config);
		this.board = new Board({ playerX: this.player.blockX, playerY: this.player.blockY });
		this.level = 1;
		this.isGameInPlay = false;
		this.playerTimeOut = 0;
		this.timerInterval = this.DEFAULT_TIMER_INTERVAL;
	}

	public handleInput = (playerResult: PlayerResultEnum, sprite?: ISprite): void => {
		switch (playerResult) {
			case PlayerResultEnum.SAFE:
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
		}
	}

	public handleTimer = (): void => {
		this.playerTimeOut ++;
		if (!this.player.inPipe && this.playerTimeOut >= this.PLAYER_TIME_OUT) {
			this.playerTimeOut = 0;
			this.player.move(DirectionEnum.STAND, this.board)
		}

		if (this.player.inPipe) {
			const result = this.player.move(this.player.direction, this.board);
			this.board.updateBoard(this.player.blockX, this.player.blockY);
			this.handleInput(result);
		}
	}

	private movePlayer = (direction: DirectionEnum): void => {
		this.playerTimeOut = 0;

		if (!this.player.inPipe) {
			const result = this.player.move(direction, this.board);
			this.board.updateBoard(this.player.blockX, this.player.blockY);
			this.handleInput(result);
		}
	}
}
