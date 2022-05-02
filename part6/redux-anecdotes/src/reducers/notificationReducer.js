import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification(state, action){
            state = action.payload
            return state
        },
        hideNotification(state, action) {
            state = initialState
            return state
        }
    }

})

const { reducer } = notificationSlice
export const { addNotification, hideNotification } = notificationSlice.actions

export const setNotification = (message, seconds) => {
    return dispatch => {
        dispatch(addNotification(message))
        setTimeout(() => dispatch(hideNotification()), seconds)
    }
}
export default reducer