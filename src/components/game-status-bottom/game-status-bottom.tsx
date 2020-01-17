import React from 'react';

import IGameStatusBottomProps from './interfaces/game-status-bottom-props';
import DrawSprite from '../draw-sprite/draw-sprite';
import ISprite from '../../classes/interfaces/sprite';

import './styles/game-status-bottom.scss';

export default class GameStatusBottom extends React.Component<IGameStatusBottomProps, {}> {

	public render() {
		return <div className="game-status-bottom">
			<div className="inventory">
				Inventory
				{ this.props.sprites?.map((sprite: ISprite) => <DrawSprite key={ sprite.key } sprite={ sprite } handleClick={ this.props.handleClick } height={ this.props.spriteHeight } width={ this.props.spriteWidth } containerWidth={ this.props.containerWidth } />) }
			</div>
		</div>
	}
}
