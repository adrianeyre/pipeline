import SpriteTypeEnum from '../enums/sprite-type-enum';

/**
 * The board's own block test, handed to a monster so it can look around itself
 * without holding a reference back to the board.
 */
type IsMyBlock = (x: number, y: number, type: SpriteTypeEnum) => boolean;

export default IsMyBlock;
