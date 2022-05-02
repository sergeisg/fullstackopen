import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { addNewAnecdoteNotification, hideNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const createNote = async (e) => {
        e.preventDefault()
        const anecdote = e.target.anecdote.value
        e.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(anecdote)
        dispatch(createAnecdote(newAnecdote))
        dispatch(addNewAnecdoteNotification(newAnecdote))
        setTimeout(() => {dispatch(hideNotification())}, 5000)
    }

    return (
        <div>
            <h2>create new</h2>
                <form onSubmit={createNote}>
                    <div><input name="anecdote" /></div>
                    <button type="submit">create</button>
                </form>
        </div>
    )
}

export default AnecdoteForm