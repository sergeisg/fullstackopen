import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { voteNewAnecdoteNotification, hideNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {

    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const sortedAnecdotes = [...anecdotes].sort((a,b) => b.votes - a.votes)

    const vote = (id) => {
    dispatch(voteAnecdote(id))
    const anecdote = anecdotes.find(a => a.id === id)
    dispatch(voteNewAnecdoteNotification(anecdote))
    setTimeout(() => {dispatch(hideNotification())}, 5000)
    }

    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
            </div>
            )}
        </div>
    )

}

export default AnecdoteList