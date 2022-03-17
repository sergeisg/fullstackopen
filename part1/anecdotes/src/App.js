import React, { useState } from 'react'
import Button from './Button'

const App = () => {
  const anecdotes = [
    'You cannot teach beginners top-down programming, because they don\'t know which end is up.',
    'The key to performance is elegance, not battalions of special cases.',
    'A complex system that works is invariably found to have evolved from a simple system that works.',
    'Optimism is an occupational hazard of programming: feedback is the treatment.',
    'Bugs lurk in corners and congregate at boundaries.',
    'Good judgment comes from experience, and experience comes from bad judgment.',
    'I find that writing unit tests actually increases my programming speed',  
  ]

  const [ selected, setSelected ] = useState(0)

  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random()*anecdotes.length))
  }

  const points = Array(anecdotes.length).fill(0)

  const [ votes, setVotes ] = useState([...points])

  const voteAnecdote = () => {
    votes[selected]=votes[selected]+1
    setVotes([...votes])
  }

  const maxVotes = () => Math.max(...votes)
  const indexOfMaxVotes = () => votes.indexOf(maxVotes())
  
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button text='next anecdote' onClick={randomAnecdote}/>
      <Button text='vote' onClick={voteAnecdote}/>
      {maxVotes()===0 ? '' : (<div><h2>Anecdote with most votes</h2>
      <p>{anecdotes[indexOfMaxVotes()]}</p>
      <p>has {maxVotes()} votes</p></div>)}
    </div>
  )
}

export default App;
