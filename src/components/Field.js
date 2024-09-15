import style from './field.module.css';
import PropTypes from 'prop-types';

export const FieldLayout = ({ field, handleClick, isGameEnded }) => {
	return (
		<div className={style.buttonContainer}>
			{field.map((elem, index) => (
				<button
					key={index}
					className={style.button}
					onClick={() => {
						if (elem === '') {
							handleClick(index);
						}
					}}
					disabled={isGameEnded}
				>
					{elem}
				</button>
			))}
		</div>
	);
};

FieldLayout.propTypes = {
	field: PropTypes.array.isRequired,
	handleClick: PropTypes.func.isRequired,
	isGameEnded: PropTypes.bool.isRequired,
};
