import '../index.css'

const Notification = ({message, displayStyle}) => {

    let className = displayStyle ? 'green' : 'red'

    return(
        <div className={className}>
            {message}
        </div>
    )
}

export default Notification