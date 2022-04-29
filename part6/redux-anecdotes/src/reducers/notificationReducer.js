import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNewAnecdoteNotification(state, action){
            state =`${action.payload} was added`
            return state
        },
        voteNewAnecdoteNotification(state, action){
            state = `you voted ${action.payload.content}`
            return state
        },
        hideNotification(state, action) {
            state = initialState
            return state
        }
    }

})

const { reducer } = notificationSlice
export const { addNewAnecdoteNotification, voteNewAnecdoteNotification, hideNotification } = notificationSlice.actions
export default reducer