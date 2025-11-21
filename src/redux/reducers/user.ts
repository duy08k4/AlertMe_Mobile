import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ReportDetail } from './report'


export type userData = {
    access_token: string,
    refresh_token: string,
    user: {
        id: string,
        email: string,
        supabase_id: string,
        role_id: string,
        created_at: string, // 2025-11-18T23:59:33.379Z
        updated_at: string, // 2025-11-18T23:59:33.379Z
        role: {
            id: string,
            name: string
        },
        profile: {
            id: string,
            username: string,
            phone_number: string | null,
            address: string | null,
            city: string | null,
            state: string | null,
            postal_code: string | null,
            country: string | null,
            profilepic: string | null,
            created_at: string,
            updated_at: string
        }
    },
    expires_in: number,
    expires_at: number
}

export interface UserState {
    user: userData['user'],
    isAuth: boolean,
    myReport: ReportDetail[]
}

const initialState: UserState = {
    user: {} as userData['user'],
    isAuth: true,
    myReport: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<userData['user']>) => {
            state.user = action.payload
        },

        setUserAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        },

        addMyReport: (state, action: PayloadAction<ReportDetail>) => {
            state.myReport.push(action.payload)
        },

        setMyReport: (state, action: PayloadAction<ReportDetail[]>) => {
            state.myReport = action.payload
        }

    },
})

// Action creators are generated for each case reducer function
export const { setUser, setUserAuth, addMyReport, setMyReport } = userSlice.actions

export default userSlice.reducer