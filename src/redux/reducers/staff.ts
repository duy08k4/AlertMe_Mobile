import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface StaffState {
    staff: staffType | {},
    isAuth: boolean,
}

type staffType = {

}

const initialState: StaffState = {
    staff: {},
    isAuth: true
}

export const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        setStaff: (state, action: PayloadAction<staffType>) => {
            state.staff = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setStaff } = staffSlice.actions

export default staffSlice.reducer