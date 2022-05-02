import { useDispatch } from "react-redux"
import { newAnecdote } from "../reducers/anecdoteReducer"
import { addNewAnecdoteNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const createNote = async (e) => {
        e.preventDefault()
        const anecdote = e.target.anecdote.value
        e.target.anecdote.value = ''
        dispatch(newAnecdote(anecdote))
        dispatch(addNewAnecdoteNotification(anecdote))
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