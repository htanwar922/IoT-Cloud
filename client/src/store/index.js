import { /*combineReducers,*/ configureStore } from '@reduxjs/toolkit';

import graphsSlice from './Graphs/Graphs'

export const actions = graphsSlice.actions

const store = configureStore({
	reducer: graphsSlice.reducer /*combineReducers({
		graphReducer: graphsSlice.reducer
	})*/
})

export default store