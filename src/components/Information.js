import PropTypes from 'prop-types';
import { Component } from 'react';

class InformationLayout extends Component {
	render() {
		const { currentPlayer, isDraw, isGameEnded } = this.props;

		let gameStateText;
		if (isDraw) {
			gameStateText = 'Ничья';
		} else if (isGameEnded) {
			gameStateText = `Победа: ${currentPlayer}`;
		} else {
			gameStateText = `Ходит: ${currentPlayer}`;
		}

		return (
			<div
				className={`mt-4 font-bold text-center ${
					gameStateText.includes('Победа') || gameStateText.includes('Ничья')
						? 'text-green-700'
						: ''
				}`}
			>
				{gameStateText}
			</div>
		);
	}
}

InformationLayout.propTypes = {
	currentPlayer: PropTypes.string.isRequired,
	isDraw: PropTypes.bool.isRequired,
	isGameEnded: PropTypes.bool.isRequired,
};

export { InformationLayout };
