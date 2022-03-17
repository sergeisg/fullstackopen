import { useState } from 'react'
import React from 'react';
import Button from './Button'
import Statistics from './Statistics'

const App = () => {

const [ good, setGood ] = useState(0)
const [ neutral, setNeutral ] = useState(0)
const [ bad, setBad ] = useState(0)
const [ all, setAll] = useState(0)

const increaseGood = () => {
  setGood(good + 1)
  setAll(all + 1)
}

const increaseNeutral = () => {
  setNeutral(neutral + 1)
  setAll(all + 1)
}

const increaseBad = () => {
  setBad(bad + 1)
  setAll(all + 1)
}

const positivePercentage = () => good ? good*100/all : good
const averageVotes = () => all ? (good-bad)/all : all

  return (
    <div>
      <h2>give feedback</h2>
      <Button text={'Good'} onClick={increaseGood} />
      <Button text={'Neutral'} onClick={increaseNeutral} />
      <Button text={'Bad'} onClick={increaseBad} />
      <h2>statistics</h2>
      {all===0 ? (
      'No feedback given' 
      ) : (
        <table>
        <Statistics goodVote={good} neutralVote={neutral} badVote={bad} allVotes={all} averageOfAllVotes={averageVotes()} positiveOfAllVotes={positivePercentage()} />
      </table>)
    }
    </div>
  );
}

export default App;
