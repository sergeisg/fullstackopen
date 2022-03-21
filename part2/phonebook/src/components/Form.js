import numberService from '../services/numbers'

const Form = ({
  personsList, 
  setNewPersonsList,
  newPersonName, 
  handleName, 
  setNewPersonName,
  newPersonNumber, 
  handleNumber,
  setNewPersonNumber,
  setNotification,
  setNotificationStyle}) => {

  const addNewPerson = (e) => {
    e.preventDefault()
    const personObject = {
      name: newPersonName,
      number: newPersonNumber
    }
    
    if (personObject.name.length < 1 || personObject.number.length < 1){
      alert('Missing stuff')
      return
    }

    if (personsList.some(x => x.name === newPersonName)) {
      const alreadyAddedPerson = personsList.filter(x => x.name === newPersonName)
      const answer = window.confirm(`${newPersonName} is already added to phonebook. Shall we replace the old number?`)
      if (answer) {
        updateContact(alreadyAddedPerson, newPersonNumber)
      } else {
        return
      }
    } else {
      addNewContact(personObject)
      setNotificationMessage(personObject)
      setNotificationStyle(true) 
      
    }
  }

  const updateContact = (person, number) => {
    numberService
    .update(person[0].id, person[0], number)
    .then(returnedPerson => {
      setNewPersonsList(personsList.map(x => 
        x.id === person[0].id ? returnedPerson : x))
      setNotificationMessage(returnedPerson)
      setNotificationStyle(true)
    })
    .catch((error) => {
      console.log(error)
    })
  }
  
  const addNewContact = (personObject) => {
    numberService
    .create(personObject)
    .then(returnedPerson => {
      setNewPersonsList(personsList.concat(returnedPerson))
      setNewPersonName('')
      setNewPersonNumber('')
      })
    .catch((error) => {
      console.log(error)
    })
    }

    const setNotificationMessage = (object) => {
      if (personsList.some(x => x.name === object.name)){
        setNotification(
          `Updated ${object.name} number` 
        )
      } else {
        setNotification(
          `Added ${object.name} number` 
        )
      }
      setTimeout(() => {
        setNotification(null)
      }, 3500)
    }
  
    return (
      <>
        <h3>Add a new person</h3>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newPersonName} 
          onChange={handleName}/>
        </div>
        <div>
          number: <input value={newPersonNumber} 
          onChange={handleNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      </>
    )
  }
  
  export default Form