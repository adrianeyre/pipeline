import React from 'react';

import ISpriteSelectionProps from './interfaces/sprite-selection-props';
import DrawSprite from '../draw-sprite/draw-sprite';
import ISprite from '../../classes/interfaces/sprite';

import './styles/sprite-selection.scss';

export default class SpriteSelection extends React.Component<ISpriteSelectionProps, {}> {

	public render() {
		return <div className="sprite-selection">
			<div className="inventory">
				{ this.props.sprites?.map((sprite: ISprite) => <DrawSprite key={ sprite.key } sprite={ sprite } handleClick={ this.props.handleClick } height={ this.props.spriteHeight } width={ this.props.spriteWidth } containerWidth={ this.props.containerWidth } />) }
			</div>
		</div>
	}
}
