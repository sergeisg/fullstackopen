import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteById = state.find(a => a.id === id)
      const votedAnecdote = {...anecdoteById, votes: anecdoteById.votes + 1}
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
export default reducer