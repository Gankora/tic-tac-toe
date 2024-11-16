import PropTypes from 'prop-types';
import { setCurrentPlayer, setDraw, setField, setGameEnded, RESET_GAME } from './actions';
import { connect } from 'react-redux';
import { FieldLayout } from './components/Field';
import { InformationLayout } from './components/Information';
import './game.module.css';
import { Component } from 'react';

class Game extends Component {
	checkWinner(newField, currentPlayer) {
		const WIN_PATTERNS = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		for (let pattern of WIN_PATTERNS) {
			const [a, b, c] = pattern;
			if (
				newField[a] === currentPlayer &&
				newField[b] === currentPlayer &&
				newField[c] === currentPlayer
			) {
				this.props.dispatch(setGameEnded());
				this.props.dispatch(setCurrentPlayer(newField[a]));
				return;
			}
		}
		if (!newField.includes('')) {
			this.props.dispatch(setDraw());
			this.props.dispatch(setGameEnded());
		}
	}

	handleClick = (index) => {
		const newField = [...this.props.field];
		newField[index] = this.props.currentPlayer;
		this.props.dispatch(setField(newField));
		this.props.dispatch(
			setCurrentPlayer(this.props.currentPlayer === 'X' ? 'O' : 'X'),
		);
		this.checkWinner(newField, this.props.currentPlayer);
	};

	handleRestart = () => {
		this.props.dispatch(RESET_GAME);
	};

	gameState() {
		const { isDraw, isGameEnded, currentPlayer } = this.props;
		if (isDraw) {
			return 'Ничья';
		} else if (isGameEnded) {
			return `Победа: ${currentPlayer}`;
		} else {
			return `Ходит: ${currentPlayer}`;
		}
	}

	render() {
		return (
			<>
				<GameLayout handleRestart={this.handleRestart} />
				<InformationLayout
					currentPlayer={this.props.currentPlayer}
					isDraw={this.props.isDraw}
					isGameEnded={this.props.isGameEnded}
				/>

				<FieldLayout handleClick={this.handleClick} />
			</>
		);
	}
}

const mapStateToProps = (state) => ({
	currentPlayer: state.currentPlayer,
	isGameEnded: state.isGameEnded,
	isDraw: state.isDraw,
	field: state.field,
});

Game.propTypes = {
	dispatch: PropTypes.func.isRequired,
	currentPlayer: PropTypes.string.isRequired,
	isGameEnded: PropTypes.bool.isRequired,
	isDraw: PropTypes.bool.isRequired,
	field: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(Game);

const GameLayout = ({ handleRestart }) => (
	<div className="mt-10 font-bold text-center">
		<button
			className="mt-5 w-40 h-6 rounded bg-blue-500 hover:bg-blue-300"
			onClick={handleRestart}
		>
			Начать заново
		</button>
	</div>
);

GameLayout.propTypes = {
	handleRestart: PropTypes.func.isRequired,
};
