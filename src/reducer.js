export const initialState = {
	currentPlayer: 'X',
	isGameEnded: false,
	isDraw: false,
	field: ['', '', '', '', '', '', '', '', ''],
};

export const appReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'SET_CURRENT_PLAYER': {
			return {
				...state,
				currentPlayer: payload,
			};
		}
		case 'SET_GAME_ENDED': {
			return {
				...state,
				isGameEnded: payload,
			};
		}
		case 'SET_DRAW': {
			return {
				...state,
				isDraw: payload,
			};
		}
		case 'SET_FIELD': {
			return {
				...state,
				field: payload,
			};
		}
		case 'RESTART_GAME': {
			return initialState;
		}
		default:
			return state;
	}
};
