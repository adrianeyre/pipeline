enum PlayerResultEnum {
	SAFE = 0,
	STAR = 1,
	BOLDER_MOVED = 2,
	INVENTORY_FULL = 3,
	INVENTORY_ADDED = 4,
	INVENTORY_USED = 5,
	NOT_IN_INVENTORY = 6,
	LOOSE_LIFE = 7,
	PLAYER_MOVED = 8,
	// DEAD deliberately keeps the value it shipped with, which PLAYER_MOVED also
	// holds. The collision is load-bearing in one direction only: `Game.looseLife`
	// compares against DEAD and works, while the `case PlayerResultEnum.DEAD`
	// branch in `Game.handleInput` is unreachable because PLAYER_MOVED matches 8
	// first. Renumbering would change which keypresses the game responds to
	// (input arrives as raw key codes through this same enum), so it is left
	// alone here and recorded rather than quietly altered.
	// eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
	DEAD = 8,
	EDIT_SPRITE = 9,
	SELECT_SPRITE = 10,
	GRASS = 11,
	ENTER = 13,
	SPACE_BAR = 32,
	ARROW_UP = 38,
	ARROW_DOWN = 40,
	ARROW_RIGHT = 39,
	ARROW_LEFT = 37,
	EDITING = 69,
}

export default PlayerResultEnum;
