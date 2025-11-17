import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
    user: userType | {},
    isAuth: boolean,
}

type userType = {

}

const initialState: UserState = {
    user: {},
    isAuth: true
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<userType>) => {
            state.user = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

export default userSlice.reducer