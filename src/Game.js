import PropTypes from 'prop-types';
import { FieldLayout } from './components/Field';
import { InformationLayout } from './components/Information';
import './game.module.css';
import style from './game.module.css';
import { store } from './store';

const GameLayout = ({ handleRestart }) => {
	return (
		<div className={style.game}>
			<h1>Крестики-нолики</h1>
			<button className={style.buttonStart} onClick={() => handleRestart()}>
				Начать заново
			</button>
		</div>
	);
};

GameLayout.propTypes = {
	handleRestart: PropTypes.func.isRequired,
};

function Game() {
	const WIN_PATTERNS = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8], // Варианты побед по горизонтали
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8], // Варианты побед по вертикали
		[0, 4, 8],
		[2, 4, 6], // Варианты побед по диагонали
	];

	const gameState = () => {
		const { currentPlayer, isGameEnded, isDraw } = store.getState();
		if (isDraw) {
			return 'Ничья';
		} else if (isGameEnded) {
			return `Победа: ${currentPlayer}`;
		} else {
			return `Ходит: ${currentPlayer}`;
		}
	};

	const checkWinner = (newField, currentPlayer) => {
		for (let i = 0; i < WIN_PATTERNS.length; i++) {
			const [a, b, c] = WIN_PATTERNS[i];
			if (
				newField[a] === currentPlayer &&
				newField[b] === currentPlayer &&
				newField[c] === currentPlayer
			) {
				store.dispatch({ type: 'SET_GAME_ENDED', payload: true });
				store.dispatch({ type: 'SET_CURRENT_PLAYER', payload: newField[a] });

				return;
			}
		}
		if (!newField.includes('')) {
			store.dispatch({ type: 'SET_DRAW', payload: true });
			store.dispatch({ type: 'SET_GAME_ENDED', payload: true });
		}
	};

	const handleClick = (index) => {
		const { field, currentPlayer } = store.getState();
		const newField = [...field];
		newField[index] = currentPlayer;
		store.dispatch({ type: 'SET_FIELD', payload: newField });
		store.dispatch({
			type: 'SET_CURRENT_PLAYER',
			payload: currentPlayer === 'X' ? 'O' : 'X',
		});

		checkWinner(newField, currentPlayer);
	};

	const handleRestart = () => {
		store.dispatch({ type: 'RESTART_GAME' });
	};

	return (
		<>
			<GameLayout handleRestart={handleRestart} />
			<InformationLayout showGameState={gameState} />
			<FieldLayout handleClick={handleClick} />
		</>
	);
}

export default Game;
