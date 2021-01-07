import React, { FC } from 'react';

import IGameStatusBottomProps from './interfaces/game-status-bottom-props';
import DrawSprite from '../draw-sprite/draw-sprite';
import ISprite from '../../classes/interfaces/sprite';

import './styles/game-status-bottom.scss';

const GameStatusBottom: FC<IGameStatusBottomProps> = (props: IGameStatusBottomProps) => {
	return <div className="game-status-bottom">
		<div className="inventory">
			Inventory
			{ props.sprites?.map((sprite: ISprite) => <DrawSprite key={ sprite.key } sprite={ sprite } handleClick={ props.handleClick } height={ props.spriteHeight } width={ props.spriteWidth } containerWidth={ props.containerWidth } />) }
		</div>
	</div>
}

export default GameStatusBottom;
