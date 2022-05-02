import { createSlice } from "@reduxjs/toolkit"

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
export default reducer