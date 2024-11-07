import PropTypes from 'prop-types';
import { setCurrentPlayer, setDraw, setField, setGameEnded, RESET_GAME } from './actions';
import { useDispatch, useSelector } from 'react-redux';
import { FieldLayout } from './components/Field';
import { InformationLayout } from './components/Information';
import './game.module.css';
import style from './game.module.css';

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
	const dispatch = useDispatch();

	const currentPlayer = useSelector((state) => state.currentPlayer);
	const isGameEnded = useSelector((state) => state.isGameEnded);
	const isDraw = useSelector((state) => state.isDraw);
	const field = useSelector((state) => state.field);

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
				dispatch(setGameEnded());
				dispatch(setCurrentPlayer(newField[a]));

				return;
			}
		}
		if (!newField.includes('')) {
			dispatch(setDraw());
			dispatch(setGameEnded());
		}
	};

	const handleClick = (index) => {
		const newField = [...field];
		newField[index] = currentPlayer;
		dispatch(setField(newField));
		dispatch(setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X'));

		checkWinner(newField, currentPlayer);
	};

	const handleRestart = () => {
		dispatch(RESET_GAME);
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
