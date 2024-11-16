import PropTypes from 'prop-types';
import { store } from '../store';
import { Component } from 'react';

class FieldLayout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			field: [],
			isGameEnded: false,
		};
		this.mounted = false;
		this.unsubscribe = store.subscribe(this.updateField);
	}

	componentDidMount() {
		this.mounted = true;
		this.updateField();
		this.unsubscribe = store.subscribe(this.updateField);
	}

	componentWillUnmount() {
		this.mounted = false;
		if (this.unsubscribe) {
			this.unsubscribe();
		}
	}

	updateField = () => {
		if (this.mounted) {
			const { field, isGameEnded } = store.getState();
			this.setState({ field, isGameEnded });
		}
	};

	render() {
		const { field, isGameEnded } = this.state;

		return (
			<div className="grid grid-cols-3 grid-rows-3 gap-1 mt-5">
				{field.map((elem, index) => (
					<button
						key={index}
						className={`w-16 h-12 rounded
							${isGameEnded ? 'bg-blue-700 shadow-none' : 'bg-blue-500 hover:bg-blue-300'}`}
						onClick={() => {
							if (elem === '') {
								this.props.handleClick(index);
							}
						}}
						disabled={isGameEnded}
					>
						{elem}
					</button>
				))}
			</div>
		);
	}
}

FieldLayout.propTypes = {
	handleClick: PropTypes.func.isRequired,
};

export { FieldLayout };
