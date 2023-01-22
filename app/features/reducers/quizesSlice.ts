import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { request } from '@utils'
import type { Quiz } from '@features/types'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

type State = {
	data: Array<Quiz>;
	loading: boolean;
}

const initialState: State = {
	data: [],
	loading: true,
}

const fetchQuizes = createAsyncThunk('quizes', async () => {
	const { data } = await request.get('/quizes')
	return data
})

const quizesSlice = createSlice({
	name: "quizes",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// fetch quizes
		builder.addCase(fetchQuizes.pending, (state) => {
			state.loading = true
		})
		builder.addCase(fetchQuizes.fulfilled, (state, { payload }: PayloadAction<Array<Quiz>>) => {
			state.loading = false
			state.data = payload
		})
		builder.addCase(fetchQuizes.rejected, (state) => {
			state.loading = true
		})
	},
})

export const selectQuizes = (state: RootState) => state.quizes
export { fetchQuizes }
export default quizesSlice.reducer
