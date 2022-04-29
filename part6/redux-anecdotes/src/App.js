import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdoteService from './services/anecdotes'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAnecdotes, appendAnecdote } from './reducers/anecdoteReducer'


const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => 
      anecdotes.forEach(anecdote => 
        {dispatch(appendAnecdote(anecdote))}))
  }, [dispatch])

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App