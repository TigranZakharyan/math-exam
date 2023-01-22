import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { secureStore, request } from '@utils';
import type { UserState, Login, Registration } from '../types'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

type State = {
	data: UserState;
	loading: boolean;
	logedIn: boolean | null;
}

const initialState: State = {
	data: {
		id: undefined,
		firstName: undefined,
		lastName: undefined,
		updatedAt: undefined,
		lastLogin: undefined,
		createdAt: undefined,
	},
	logedIn: null,
	loading: true,
}

const loginThunk = createAsyncThunk<UserState, Login>('user/login', async (data: Login) => {
	const { data: { access_token } } = await request.post('/auth/user', data);
	await secureStore.setItem('access_token', access_token)
	const responseFetch = await request.get('/users/user')
	return responseFetch.data
})

const regThunk = createAsyncThunk('user/reg', async (data: Registration) => {
	await request.post('/users/signup', data);
})

const fetchMe = createAsyncThunk('user/user', async () => {
	const { data } = await request.get("/users/user")
	return data
})

const logOutThunk = createAsyncThunk('user/logOut', async () => {
	await secureStore.deleteItem('access_token');
})

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// Login
		builder.addCase(loginThunk.pending, (state) => {
			state.loading = true
		})
		builder.addCase(loginThunk.fulfilled, (state, { payload }: PayloadAction<UserState>) => {
			state.loading = false
			state.logedIn = true
			state.data = payload
		})
		builder.addCase(loginThunk.rejected, (state) => {
			state.loading = false
		})

		// Fetch me
		builder.addCase(fetchMe.pending, (state) => {
			state.loading = true
		})
		builder.addCase(fetchMe.fulfilled, (state, { payload }: PayloadAction<UserState>) => {
			state.loading = false
			state.logedIn = true
			state.data = payload
		})
		builder.addCase(fetchMe.rejected, (state) => {
			state.loading = false
			state.logedIn = false
		})

		builder.addCase(logOutThunk.fulfilled, (state) => {
			state = initialState
			state.logedIn = false
			return state
		})
	},
})

export const selectUser = (state: RootState) => state.user;
export { loginThunk, regThunk, fetchMe, logOutThunk }
export default userSlice.reducer
