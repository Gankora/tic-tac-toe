import style from './field.module.css';
import PropTypes from 'prop-types';
import { store } from '../store';
import { useState, useEffect } from 'react';

export const FieldLayout = ({ handleClick }) => {
	const [field, setField] = useState([]);
	const [isGameEnded, setIsGameEnded] = useState(false);

	useEffect(() => {
		const updateField = () => {
			const { field, isGameEnded } = store.getState();
			setField(field);
			setIsGameEnded(isGameEnded);
		};

		updateField();
		const unsubscribe = store.subscribe(updateField);
		return () => unsubscribe();
	}, []);

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
	handleClick: PropTypes.func.isRequired,
};
