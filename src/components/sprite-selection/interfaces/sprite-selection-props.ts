import ISprite from "../../../classes/interfaces/sprite";

export default interface ISpriteSelectionProps {
	sprites?: ISprite[]
	spriteHeight: number;
	spriteWidth: number;
	containerWidth: number;
	handleClick(sprite: ISprite): void;
}
