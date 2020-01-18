import React from 'react';
import { shallow } from 'enzyme';

import GameStatusBottom from '../sprite-selection';
import ISpriteSelectionProps from '../interfaces/sprite-selection-props';

describe('Game Status Bottom', () => {
	it('Should render correctly', () => {
		const defaultProps: ISpriteSelectionProps = {
			sprites: [],
			spriteHeight: 3,
			spriteWidth: 3,
			containerWidth: 500,
			handleClick: jest.fn(),
		};

		const gameStatus = shallow(<GameStatusBottom {...defaultProps} />);
		expect(gameStatus).toMatchSnapshot();
	});
});