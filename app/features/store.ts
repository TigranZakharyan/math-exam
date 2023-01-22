import { configureStore } from '@reduxjs/toolkit'
import { booksReducer, quizesReducer, userReducer } from './reducers'

const store = configureStore({
	reducer: {
		user: userReducer,
		books: booksReducer,
		quizes: quizesReducer,
	},
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export default store