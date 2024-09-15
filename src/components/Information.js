import style from './info.module.css';
import PropTypes from 'prop-types';

export const InformationLayout = ({ showGameState, isGameEnded }) => {
	return (
		<div
			style={{ marginTop: '15px', fontWeight: 'bolder' }}
			className={isGameEnded ? style.state : null}
		>
			{showGameState()}
		</div>
	);
};

InformationLayout.propTypes = {
	showGameState: PropTypes.func.isRequired,
	isGameEnded: PropTypes.bool.isRequired,
};
