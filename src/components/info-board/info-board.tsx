import React, { FC } from 'react';

import IInfoBoardProps from './interfaces/info-board-props';

import player from '../../images/player-stand.png';

import './styles/info-board.scss';

const InfoBoard: FC<IInfoBoardProps> = (props: IInfoBoardProps) => {
	const styleInfoBoard = () => ({
		width: `80%`,
		maxWidth: `${ props.containerHeight }px`,
	})

	return <div className="info-board" style={ styleInfoBoard() }>
		<div className="info-board-header">
			<img src={ player } alt="player" />
			<span className="header-text">Pipeline</span>
			<img src={ player } alt="player" />
		</div>

		{ props.gameOver && <div className="game-over-area">
			<div className="game-over-title">Game Over</div>
			<div className="game-over-text">You scored { props.score }, better luck next time!</div>
		</div> }

		<div className="info-board-instructions">
			<p>This is a remake of two of my favourite games for the <a href="https://en.wikipedia.org/wiki/BBC_Micro" target="_blank" rel="noopener noreferrer"> BBC Micro</a>, <a href="https://en.wikipedia.org/wiki/Repton_(video_game)" target="_blank" rel="noopener noreferrer">Repton</a> and <a href="https://en.wikipedia.org/wiki/Pipeline_(video_game)" target="_blank" rel="noopener noreferrer">Pipeline</a>.</p>
			<p>You have to navigate Repton around the playing field collecting all of the stars. There are plenty of puzzles to solve including gates, keys, boulders and teleports</p>
			<table>
				<tbody>
					<tr>
						<td className="title">Function</td>
						<td className="title">Key</td>
					</tr>
					<tr>
						<td>Move Up</td>
						<td>Arrow Up</td>
					</tr>
					<tr>
						<td>Move Down</td>
						<td>Arrow Down</td>
					</tr>
					<tr>
						<td>Move Left</td>
						<td>Arrow Left</td>
					</tr>
					<tr>
						<td>Move Right</td>
						<td>Arrow Right</td>
					</tr>
					<tr>
						<td>Inventory Swap</td>
						<td>Spacebar</td>
					</tr>
					<tr>
						<td>Inventory Drop</td>
						<td>Enter</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div className="button-area">
			<button type="button" onClick={ props.startGame }>Play Game</button>
		</div>
	</div>
}

export default InfoBoard;
