import { render } from '@testing-library/react';

import GameStatusTop from '../game-status-top';
import IGameStatusTopProps from '../interfaces/game-status-top-props';

describe('Game Status Top', () => {
	it('Should render correctly', () => {
		const defaultProps: IGameStatusTopProps = {
			score: 1000,
			lives: 3,
		};

		const gameStatus = render(<GameStatusTop {...defaultProps} />);
		expect(gameStatus).toMatchSnapshot();
	});
});