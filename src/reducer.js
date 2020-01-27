const initialState = {};

const reducer = (prevdata = initialState, action) => {
	if (action.type === 'GET') {
		return action.data;
	}
	return action.data;
}

export default reducer;