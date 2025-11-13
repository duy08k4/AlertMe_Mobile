import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ReportState {
    report: reportType | {},
    isAuth: boolean,
}

type reportType = {

}

const initialState: ReportState = {
    report: {},
    isAuth: false
}

export const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        setReport: (state, action: PayloadAction<reportType>) => {
            state.report = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setReport } = reportSlice.actions

export default reportSlice.reducer