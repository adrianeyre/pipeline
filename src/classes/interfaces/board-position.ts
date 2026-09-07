/**
 * A board lookup that may not find anything: `teleport` and the start-square
 * search both return null coordinates when no matching square exists, and every
 * caller checks for that before moving the player.
 */
export default interface IBoardPosition {
	xPos: number | null;
	yPos: number | null;
}
