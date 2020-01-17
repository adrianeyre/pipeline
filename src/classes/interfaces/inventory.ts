import ISprite from './sprite';
import SpriteTypeEnum from '../enums/sprite-type-enum';
import PlayerResultEnum from '../enums/player-result-enum';

export default interface IInventory {
	spriteBlockWidth: number;
	spriteBlockHeight: number;
	spriteWidth: number;
	spriteHeight: number;
	sprites: ISprite[];
	count: number;
	slot: number;
	maxItems: number;
	addItem(block: SpriteTypeEnum): PlayerResultEnum;
	useItem(block: SpriteTypeEnum): PlayerResultEnum;
	moveSlot(): void;
	drop(): SpriteTypeEnum | null;
	remove(type: SpriteTypeEnum): void;
}
