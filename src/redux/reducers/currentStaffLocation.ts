import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CurrentLocationState {
    staffPosition: [number, number] | null;
    userPosition: [number, number] | null;
}

const initialState: CurrentLocationState = {
    staffPosition: null,
    userPosition: null
}

export const currentLocationSlice = createSlice({
    name: 'currentLocation',
    initialState,
    reducers: {
        setStaffPosition: (state, action: PayloadAction<[number, number] | null>) => {
            state.staffPosition = action.payload
        },

        setUserPosition: (state, action: PayloadAction<[number, number] | null>) => {
            state.staffPosition = action.payload
        },
    },
})

export const { setStaffPosition, setUserPosition } = currentLocationSlice.actions

export default currentLocationSlice.reducer
