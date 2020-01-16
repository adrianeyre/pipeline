import IPlayer from '../../../classes/interfaces/player';
import ISprite from '../../../classes/interfaces/sprite';
import IMonster from '../../../classes/interfaces/monster';

export default interface IDrawSpriteProps {
	sprite: IPlayer | ISprite | IMonster;
	height: number;
	width: number;
	containerWidth: number;
	handleClick(sprite: IPlayer | ISprite | IMonster): void;
}
