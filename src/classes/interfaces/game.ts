import IPlayer from './player';
import ISprite from './sprite';
import IBoard from './board';
import PlayerResultEnum from '../enums/player-result-enum';

export default interface IGame {
	player: IPlayer;
	sprites?: ISprite[];
	board: IBoard;
	level: number;
	iteration: number;
	timer: any;
	playerTimeOut: number;
	isGameInPlay: boolean;
	timerInterval: number;
	editing: boolean;
	handleInput(playerResult: PlayerResultEnum, sprite?: ISprite): void;
	handleTimer(): void;
}
