import styles from './info.module.css';
import PropTypes from 'prop-types';
import { store } from '../store';
import { useState, useEffect } from 'react';

export const InformationLayout = ({ showGameState }) => {
	const [gameStateText, setGameStateText] = useState('');

	useEffect(() => {
		const updateGameState = () => {
			setGameStateText(showGameState());
		};

		updateGameState();
		const unsubscribe = store.subscribe(updateGameState);
		return () => unsubscribe();
	}, [showGameState]);

	return (
		<div
			style={{ marginTop: '15px', fontWeight: 'bolder' }}
			className={
				gameStateText.includes('Победа') || gameStateText.includes('Ничья')
					? styles.state
					: null
			}
		>
			{gameStateText}
		</div>
	);
};

InformationLayout.propTypes = {
	showGameState: PropTypes.func.isRequired,
};
