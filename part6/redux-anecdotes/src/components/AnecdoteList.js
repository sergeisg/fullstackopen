import { useSelector, useDispatch } from "react-redux"
import { voteAnecdotes } from "../reducers/anecdoteReducer"
import { voteNewAnecdoteNotification, hideNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        if (state.filter.length > 2) {
            return state.anecdotes.filter(n => n.content.includes(state.filter))
        } else {
            return state.anecdotes
        }
    })
    const sortedAnecdotes = [...anecdotes].sort((a,b) => b.votes - a.votes)

    const vote = (id) => {
    dispatch(voteAnecdotes(id))
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