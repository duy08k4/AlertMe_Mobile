import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export type userData = {
    access_token: string,
    refresh_token: string,
    user: {
        id: string,
        email: string,
        supabase_id: string,
        role_id: string,
        created_at: string,
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

export type myReport = {
    name: string,
    details: string,
    attachment_paths: string[],
    lat: string | number,
    lng: string | number,
    user_id: string,


    // id?: "ceb01f4f-3971-4823-b38c-3be209ed77a1",
    // name: "Broken streetlight on 5th Ave",
    // details: "The streetlight has been flickering for two nights.",
    // status?: "pending",
    // attachment_path: null,
    // lat: 10.762622,
    // lng: 106.660172,
    // user_id: "f46ea729-4d92-430a-a4d7-62376d7f7986",
    // created_at: "2025-11-20T08:46:42.431Z",
    // updated_at: "2025-11-20T08:46:42.431Z"

}

export interface UserState {
    user: userData['user'] | {},
    isAuth: boolean,
    myReport: myReport[]
}

const initialState: UserState = {
    user: {},
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
        addMyReport: ((state, action: PayloadAction<myReport>) => {
            state.myReport.push(action.payload)
        }),

    },
})

// Action creators are generated for each case reducer function
export const { setUser, setUserAuth, addMyReport } = userSlice.actions

export default userSlice.reducer