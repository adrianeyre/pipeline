import { render } from '@testing-library/react';

import GameStatusBottom from '../game-status-bottom';
import IGameStatusBottomProps from '../interfaces/game-status-bottom-props';

describe('Game Status Bottom', () => {
	it('Should render correctly', () => {
		const defaultProps: IGameStatusBottomProps = {
			sprites: [],
			spriteHeight: 3,
			spriteWidth: 3,
			containerWidth: 500,
			handleClick: jest.fn(),
		};

		const gameStatus = render(<GameStatusBottom {...defaultProps} />);
		expect(gameStatus).toMatchSnapshot();
	});
});