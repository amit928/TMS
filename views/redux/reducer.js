import { createSlice } from '@reduxjs/toolkit'

export const commonSlice = createSlice({
    name: 'common',
    initialState: {
        accessToken: "",
        loading: false
    },
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
    },
})

export const { setAccessToken, setLoading } = commonSlice.actions

export default commonSlice.reducer
