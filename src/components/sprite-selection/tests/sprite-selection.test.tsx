import { render } from '@testing-library/react';

import GameStatusBottom from '../sprite-selection';
import ISpriteSelectionProps from '../interfaces/sprite-selection-props';

describe('Game Status Bottom', () => {
	it('Should render correctly', () => {
		const defaultProps: ISpriteSelectionProps = {
			sprites: [],
			spriteHeight: 3,
			spriteWidth: 3,
			containerWidth: 500,
			handleClick: vi.fn(),
		};

		const gameStatus = render(<GameStatusBottom {...defaultProps} />);
		expect(gameStatus).toMatchSnapshot();
	});
});
