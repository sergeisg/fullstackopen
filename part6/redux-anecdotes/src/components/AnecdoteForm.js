import { connect } from "react-redux"
import { newAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

    const createNote = async (e) => {
        e.preventDefault()
        const anecdote = e.target.anecdote.value
        e.target.anecdote.value = ''
        props.newAnecdote(anecdote)
        props.setNotification(`You added ${anecdote}`, 5000)
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
const mapStateToProps = (state) => {
    return {
      anecdotes: state.anecdotes
    }
  }

  const mapDispatchToProps = {
    newAnecdote
  }
const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm