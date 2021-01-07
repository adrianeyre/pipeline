import React, { FC } from 'react';

import ISpriteSelectionProps from './interfaces/sprite-selection-props';
import DrawSprite from '../draw-sprite/draw-sprite';
import ISprite from '../../classes/interfaces/sprite';

import './styles/sprite-selection.scss';

const SpriteSelection: FC<ISpriteSelectionProps> = (props: ISpriteSelectionProps) => {
	return <div className="sprite-selection">
		<div className="inventory">
			{ props.sprites?.map((sprite: ISprite) => <DrawSprite key={ sprite.key } sprite={ sprite } handleClick={ props.handleClick } height={ props.spriteHeight } width={ props.spriteWidth } containerWidth={ props.containerWidth } />) }
		</div>
	</div>
}

export default SpriteSelection;
