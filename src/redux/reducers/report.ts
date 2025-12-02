import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { reportStatus } from '../../config/reportStatus'


export type reportType = {
    id: string,
    status: keyof typeof reportStatus,
    attachment_paths: string[]
    name: string,
    lat: number,
    lng: number
    created_at: string
}

export type ReportDetail = {
    id: string,
    name: string,
    details: string,
    status: keyof typeof reportStatus,
    attachment_paths: string[],
    lat: number,
    lng: number,
    user_id: string,
    created_at: string,
    updated_at: string,
    user: {
        id: string,
        username: string,
        phone_number: null | string,
        address: null | string,
        city: null | string,
        state: null | string,
        postal_code: null | string,
        country: null | string,
        profilepic: null | string,
        created_at: string,
        updated_at: string
    },
    tasks: [],
    responses: []
}

export interface ReportState {
    reports: reportType[],
    discoveredReport: reportType[]
    reportDetailID: string
    reportDetail: ReportDetail
    isAuth: boolean,
}

export type SOSReport = {
    lat: number,
    lng: number,
    user_id: string
}

const initialState: ReportState = {
    reports: [],
    discoveredReport: [],
    reportDetailID: "",
    reportDetail: {} as ReportDetail,
    isAuth: false
}

export const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        setReport: (state, action: PayloadAction<reportType[]>) => {
            state.reports = action.payload
        },

        setDiscoveredReport: (state, action: PayloadAction<reportType[]>) => {
            state.discoveredReport = action.payload
        },

        setReportDetailID: (state, action: PayloadAction<string>) => {
            state.reportDetailID = action.payload
        },

        setReportDetail: (state, action: PayloadAction<ReportDetail>) => {
            const getReportDetail = action.payload
            if (getReportDetail.id) state.reportDetail = action.payload
        },

        addNewReport: (state, action: PayloadAction<reportType>) => {
            state.reports.unshift(action.payload)
        }
    },
})

// Action creators are generated for each case reducer function
export const { setReport, setDiscoveredReport, setReportDetailID, setReportDetail, addNewReport } = reportSlice.actions

export default reportSlice.reducer