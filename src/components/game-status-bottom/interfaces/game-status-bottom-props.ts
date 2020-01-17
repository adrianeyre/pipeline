import ISprite from "../../../classes/interfaces/sprite";

export default interface IGameStatusBottomProps {
	sprites?: ISprite[]
	spriteHeight: number;
	spriteWidth: number;
	containerWidth: number;
	handleClick(sprite: ISprite): void;
}
