import IPlayer from './player';
import ISprite from './sprite';
import IBoard from './board';
import PlayerResultEnum from '../enums/player-result-enum';
import SpriteTypeEnum from '../enums/sprite-type-enum';

export default interface IGame {
	player: IPlayer;
	sprites?: ISprite[];
	board: IBoard;
	level: number;
	monsterIteration: number;
	boulderIteration: number;
	timer: any;
	playerTimeOut: number;
	isGameInPlay: boolean;
	timerInterval: number;
	editing: boolean;
	selectedSprite: SpriteTypeEnum;
	handleInput(playerResult: PlayerResultEnum, sprite?: ISprite): void;
	handleTimer(): void;
}
