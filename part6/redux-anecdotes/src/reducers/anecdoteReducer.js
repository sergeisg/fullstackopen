import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const votedAnecdote = action.payload
      const id = action.payload.id
      return state.map(anecdote => anecdote.id === id ? votedAnecdote : anecdote)
    },
    createAnecdote (state, action) {
      state.push(action.payload)
      },
    appendAnecdote (state, action) {
      state.push(action.payload)
    }
  }

})

const {reducer} = anecdoteSlice
export const { voteAnecdote, createAnecdote, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    anecdotes.forEach(anecdote => dispatch(appendAnecdote(anecdote)))
  }
}

export const newAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdotes = id => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.vote(id)
    dispatch(voteAnecdote(votedAnecdote))
  }
}
export default reducer