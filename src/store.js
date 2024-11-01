// Cобственный мини-Redux
import { appReducer, initialState } from './reducer';

const createStore = (reducer) => {
	let state; // изначально будет равен undefined
	let listeners = [];

	return {
		dispatch: (action) => {
			state = reducer(state, action); // если state = undefined, то по умолчанию state = initialState (см. reducer.js)
			listeners.forEach((listener) => listener()); // уведомляем всех подписчиков
		},
		getState: () => state,
		subscribe: (listener) => {
			listeners.push(listener); // добавляем подписичка
			return () => {
				listeners = listeners.filter((l) => l !== listener); // удаление подписчика
			};
		},
	};
};

export const store = createStore(appReducer, initialState);

store.dispatch({}); // для определения начального состояния (initialState)
