import React from 'react';
import Game from '../../classes/game';
import ISprite from '../../classes/interfaces/sprite';
import IMonster from '../../classes/interfaces/monster';
import PlayerResultEnum from '../../classes/enums/player-result-enum';
import IPipelineProps from './interfaces/pipeline-props';
import IPipelineState from './interfaces/pipeline-state';
import GameStatusTop from '../game-status-top/game-status-top';
import GameStatusBottom from '../game-status-bottom/game-status-bottom';
import DrawSprite from '../draw-sprite/draw-sprite';
import InfoBoard from '../info-board/info-board';
import MobileButtons from '../mobile-buttons/mobile-buttons';

import './styles/pipeline.scss';

export default class Pipeline extends React.Component<IPipelineProps, IPipelineState> {
	private SPRITE_BLOCKS_WIDTH: number = 36;
	private SPRITE_BLOCKS_HEIGHT: number = 36;
	private container: any;

	constructor(props: IPipelineProps) {
		super(props);

		this.state = {
			spriteWidth: 0,
			spriteHeight: 0,
			containerWidth: 800,
			containerHeight: 800,
			timerInterval: 0,
			game: new Game(this.props),
			showBoardMap: false,
		}

		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.styleContainer = this.styleContainer.bind(this);
	}

	public async componentDidMount() {
		this.updatePlayerArea();
		window.addEventListener('keydown', this.handleKeyDown);
		window.addEventListener('resize', this.updatePlayerArea);
	}

	public async componentWillUnmount() {
		await this.stopTimer();
		window.removeEventListener('keydown', this.handleKeyDown);
		window.removeEventListener('resize', this.updatePlayerArea);
	}

	public render() {
		return <div className="pipeline-play-container" ref={(d) => { this.container = d }} style={ this.styleContainer() }>
			{ !this.state.showBoardMap && <div>
				{ !this.state.game.editing && <div>
					<div style={ this.styleStatusTop() }><GameStatusTop score={ this.state.game.player.score } lives={ this.state.game.player.lives } /></div>
				</div> }

				{ !this.state.game.isGameInPlay && <div style={ this.styleInfoBoard() }>
					<InfoBoard gameOver={ this.state.game.player.lives < 1 } startGame={ this.startGame } score={ this.state.game.player.score } containerHeight={ this.state.containerHeight } />
				</div> }

				{ this.state.game.isGameInPlay && <div className="play-area">
					{ this.state.game.board.sprites?.map((sprite: ISprite) => <DrawSprite key={ sprite.key } sprite={ sprite } handleClick={ this.handleSpriteClick } height={ this.state.spriteHeight } width={ this.state.spriteWidth } containerWidth={ this.state.containerWidth } />) }

					{ !this.state.game.editing && <div>
						{ this.state.game.board.monsters?.map((sprite: IMonster) => <DrawSprite key={ sprite.key } sprite={ sprite } handleClick={ this.handleClick } height={ this.state.spriteHeight } width={ this.state.spriteWidth } containerWidth={ this.state.containerWidth } />) }

						<DrawSprite sprite={ this.state.game.player } handleClick={ this.handleClickPlayer }height={ this.state.spriteHeight } width={ this.state.spriteWidth } containerWidth={ this.state.containerWidth } />
					</div> }
				</div> }

				{ !this.state.game.editing && <div>
					<div style={ this.styleStatusBottom() }><GameStatusBottom sprites={ this.state.game.board.inventory.sprites } handleClick={ this.handleClick } spriteHeight={ this.state.spriteHeight } spriteWidth={ this.state.spriteWidth } containerWidth={ this.state.containerWidth } /></div>
				</div> }

				{ this.state.game.isGameInPlay && this.state.containerWidth < 600 && <div style={ this.styleGameButtons() }><MobileButtons handleMobileButton={ this.handleMobileButton }/></div> }
			</div> }

			{ this.state.showBoardMap && <div className="map">
				[{ this.state.game.board.board.map((board: number[], index: number) => <div key={ `map-${ index }` }>[
					{ board.join(',') }
				],</div> )}]
			</div> }
		</div>
	}

	private styleContainer = () => ({
		maxWidth: `${ this.state.containerHeight }px`,
	})

	private styleInfoBoard = () => ({
		position: 'absolute' as 'absolute',
		width: `100%`,
		maxWidth: `${ this.state.containerHeight }px`,
	})

	private styleStatusTop = () => ({
		position: 'absolute' as 'absolute',
		width: `100%`,
		maxWidth: `${ this.state.containerHeight }px`,
	})

	private styleStatusBottom = () => ({
		position: 'absolute' as 'absolute',
		width: `100%`,
		maxWidth: `${ this.state.containerHeight }px`,
		top: `${ this.state.containerWidth / 100 * 94.375 }px`,
	})

	private styleGameButtons = () => ({
		position: 'absolute' as 'absolute',
		width: `100%`,
		maxWidth: `${ this.state.containerHeight }px`,
		top: `${ this.state.containerWidth / 100 * 105 }px`,
	})

	private startGame = async (): Promise<void> => {
		const game = new Game(this.props);
		game.isGameInPlay = true;
		await this.startTimer();
		await this.setState(() => ({ game }));
		this.updatePlayerArea();
	}

	private handleInput = async (input: PlayerResultEnum): Promise<void> => {
		const game = this.state.game;
		game.handleInput(input);

		if (!game.isGameInPlay) this.stopTimer();
		await this.setState(() => ({ game }));
	}

	private handleKeyDown = async (event: any): Promise<void> => {
		if (!this.state.game.isGameInPlay) return;

		if (event.keyCode === 77) {
			await this.setState(prev => ({ showBoardMap: !prev.showBoardMap }));
			return;
		}

		await this.handleInput(event.keyCode);
	}

	private updatePlayerArea = (): void => {
		const containerHeight = this.container && this.container.getBoundingClientRect().height;
		let containerWidth = this.container && this.container.getBoundingClientRect().width;
		if (containerWidth > containerHeight) containerWidth = containerHeight;
		const spriteWidth = containerWidth / this.SPRITE_BLOCKS_WIDTH;
		const spriteHeight = ((containerWidth / 100) * 100 ) / this.SPRITE_BLOCKS_HEIGHT;
		this.setState(() => ({ spriteWidth, spriteHeight, containerWidth, containerHeight }))
	}

	private startTimer = async (): Promise<void> => {
		const timerInterval = this.state.game.timerInterval;
		const timer = setInterval(this.myTimer, this.state.game.timerInterval);

		await this.setState(() => ({ timer, timerInterval }));
	}

	private stopTimer = async (): Promise<void> => {
		clearInterval(this.state.timer);

		await this.setState(() => ({ timer: undefined }));
	}

	private myTimer = (): void => {
		const game = this.state.game
		game.handleTimer();
		this.handleTimerUpdates();

		this.setState(prev => ({ game }));
		if (!this.state.game.isGameInPlay) this.stopTimer();
	}

	private handleTimerUpdates = () => {
		if (this.state.timerInterval === this.state.game.timerInterval) return;

		this.stopTimer();
		this.startTimer();
	}

	private handleMobileButton = async (direction: PlayerResultEnum): Promise<void> => await this.handleInput(direction);

	private handleSpriteClick = async (sprite: ISprite) => {
		this.state.game.handleInput(PlayerResultEnum.EDIT_SPRITE, sprite);
	}

	private handleClick = async (sprite: ISprite) => {
		
	}

	private handleClickPlayer = (sprite: ISprite) => {

	}
}
