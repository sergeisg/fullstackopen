import { createSlice } from "@reduxjs/toolkit"

const initialState = 'This is a notification'

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
    }

})

const { reducer } = notificationSlice
export default reducer