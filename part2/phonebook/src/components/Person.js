import numberService from '../services/numbers'

const Person = ({
    eachPerson, 
    persons, 
    setPersons, 
    setDisplayMessage,
    setDisplayMessageStyle}) => {

    const handleClick = () => {
        const answer = window.confirm(`Deleting ${eachPerson.name} Are you sure?`)
        if (answer){
            handleDelete()
        }
    }

    const handleDelete = () => {
        
        numberService
        .deleteNumber(eachPerson.id)
        .then(returnedPerson => {
            setPersons(persons.filter(person=>person.id !== eachPerson.id))
        })
        .catch(error => {
            setPersons(persons.filter(person => person.id !== eachPerson.id))
            setDisplayMessageStyle(false)
            setDisplayMessage(
                `the number of ${eachPerson.name} was already deleted from server`
            )
            setTimeout(() => {
                setDisplayMessage(null)
              }, 3500)
        })
    }
 
    return (
    <>
    <li key={eachPerson.id}>
        {eachPerson.name} : {eachPerson.number}
        <button 
        onClick={handleClick}>
        delete 
        </button>
    </li>
    </>
    )
}

export default Person
