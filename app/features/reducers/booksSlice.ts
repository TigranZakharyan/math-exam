import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { request } from '@utils'
import type { Book } from '@features/types'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

type State = {
	data: Array<Book>;
	loading: boolean;
}

const initialState: State = {
	data: [],
	loading: true,
}

const fetchBooks = createAsyncThunk('books', async () => {
	const { data } = await request.get('/books')
	return data
})

const booksSlice = createSlice({
	name: "books",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// fetch books
		builder.addCase(fetchBooks.pending, (state) => {
			state.loading = true
		})
		builder.addCase(fetchBooks.fulfilled, (state, { payload }: PayloadAction<Array<Book>>) => {
			state.loading = false
			state.data = payload
		})
		builder.addCase(fetchBooks.rejected, (state) => {
			state.loading = true
		})
	},
})

export const selectBooks = (state: RootState) => state.books
export { fetchBooks }
export default booksSlice.reducer
