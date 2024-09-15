import PropTypes from 'prop-types';
import { FieldLayout } from './components/Field';
import { InformationLayout } from './components/Information';
import './game.module.css';
import style from './game.module.css';
import React, { useState } from 'react';

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
	const [currentPlayer, setCurrentPlayer] = useState('X');
	const [isGameEnded, setIsGameEnded] = useState(false); // Конец игры
	const [isDraw, setIsDraw] = useState(false); // Ничья
	const [field, setField] = useState(['', '', '', '', '', '', '', '', '']);

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
		} else if (!isGameEnded) {
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
				setIsGameEnded(true);
				setCurrentPlayer(newField[a]);

				return;
			}
		}
		if (!newField.includes('')) {
			setIsDraw(true);
			setIsGameEnded(true);
		}
	};

	const handleClick = (index) => {
		const newField = [...field];
		newField[index] = currentPlayer;
		setField(newField);
		setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');

		checkWinner(newField, currentPlayer);
		return;
	};

	const handleRestart = () => {
		setField(['', '', '', '', '', '', '', '', '']);
		setIsGameEnded(false);
		setIsDraw(false);
		setCurrentPlayer('X');
		return;
	};

	return (
		<>
			<GameLayout handleRestart={handleRestart} />
			<InformationLayout
				showGameState={gameState}
				isDraw={isDraw}
				isGameEnded={isGameEnded}
			/>
			<FieldLayout
				field={field}
				handleClick={handleClick}
				isGameEnded={isGameEnded}
			/>
		</>
	);
}

export default Game;
