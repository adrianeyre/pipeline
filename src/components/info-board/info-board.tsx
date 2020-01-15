import React from 'react';

import IInfoBoardProps from './interfaces/info-board-props';

import player from '../../images/player-stand.png';

import './styles/info-board.scss';

export default class InfoBoard extends React.Component<IInfoBoardProps, {}> {
	public render() {
		return <div className="info-board" style={ this.styleInfoBoard() }>
			<div className="info-board-header">
				<img src={ player } alt="player" />
				<span className="header-text">Pipeline</span>
				<img src={ player } alt="player" />
			</div>

			{ this.props.gameOver && <div className="game-over-area">
				<div className="game-over-title">Game Over</div>
				<div className="game-over-text">You scored { this.props.score }, better luck next time!</div>
			</div> }

			<div className="info-board-instructions">
				<p>This is a remake of two of my favourite games for the <a href="https://en.wikipedia.org/wiki/BBC_Micro" target="_blank" rel="noopener noreferrer"> BBC Micro</a>, <a href="https://en.wikipedia.org/wiki/Repton_(video_game)" target="_blank" rel="noopener noreferrer">Repton</a> and <a href="https://en.wikipedia.org/wiki/Pipeline_(video_game)" target="_blank" rel="noopener noreferrer">Pipeline</a>.</p>
				<p>You have to navigate Repton around the playing field collecting all of the stars. There are plenty of puzzles to solve including gates, keys, boulders and teleports</p>
			</div>

			<div className="button-area">
				<button type="button" onClick={ this.props.startGame }>Play Game</button>
			</div>
		</div>
	}

	private styleInfoBoard = () => ({
		width: `80%`,
		maxWidth: `${ this.props.containerHeight }px`,
	})
}
