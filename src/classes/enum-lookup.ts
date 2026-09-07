import DirectionEnum from './enums/direction-enum';
import ImageEnum from './enums/image-enum';
import MonsterTypeEnum from './enums/monster-type-enum';
import SpriteTypeEnum from './enums/sprite-type-enum';

/**
 * Level data is a grid of plain numbers, and the enums that give those numbers
 * meaning are keyed by name. Every crossing between the two used to be a
 * `@ts-ignore` at the call site. The casts live here instead, once each, so a
 * lookup TypeScript cannot prove safe reads as one deliberate decision rather
 * than nine scattered suppressions.
 */
const byName = <T extends object>(source: T, name: string): T[keyof T] => source[name as keyof T];

/** `12` -> `SPRITE12`. Single digits are zero-padded to match the enum's keys. */
export const spriteImageName = (block: number): string =>
	`SPRITE${block.toString().length === 1 ? '0' : ''}${block}`;

export const imageForBlock = (block: number): ImageEnum =>
	byName(ImageEnum, spriteImageName(block));

export const spriteTypeByName = (name: string): SpriteTypeEnum => byName(SpriteTypeEnum, name);

export const monsterTypeByName = (name: string): MonsterTypeEnum => byName(MonsterTypeEnum, name);

export const directionByName = (name: string): DirectionEnum => byName(DirectionEnum, name);
