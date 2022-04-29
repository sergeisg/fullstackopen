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
    addAnecdote (state, action) {
      //const newAnecdote = asObject(action.payload)
      //state.push(newAnecdote)
      },
    appendAnecdote (state, action) {
      state.push(action.payload)
    },
    setAnecdotes (state, action) {
      return action.playload
    }
  }

})

const {reducer} = anecdoteSlice
export const { voteAnecdote, addAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default reducer