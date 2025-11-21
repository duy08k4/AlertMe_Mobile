import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ReportState {
    reports: reportType[],
    isAuth: boolean,
}

export type reportType = {
    id: string,
    name: string,
    lat: number,
    lng: number
}

const initialState: ReportState = {
    reports: [],
    isAuth: false
}

export const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        setReport: (state, action: PayloadAction<reportType[]>) => {
            state.reports = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setReport } = reportSlice.actions

export default reportSlice.reducer