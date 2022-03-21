import { useState, useEffect } from 'react'
import Form from './components/Form'
import Filter from './components/Filter'
import Numbers from './components/Numbers'
import numberService from './services/numbers'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ displayMessage, setDisplayMessage ] = useState(null)
  const [ messageStyle, setMessageStyle ] = useState(true)

  useEffect(() => {
    numberService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  
  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }
  
  const handleFilterChange = (e) => {
    setNewFilter(e.target.value)  
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      {displayMessage === null ? '' : <Notification 
      message={displayMessage} 
      displayStyle={messageStyle}/>}
      <Filter filter = {newFilter}
      handleFilter = {handleFilterChange}
      showSetter = {setShowAll}/>
      <Form personsList = {persons} 
      newPersonName = {newName} 
      newPersonNumber = {newNumber}
      setNewPersonName = {setNewName}
      setNewPersonNumber = {setNewNumber}
      setNewPersonsList={setPersons}
      handleName = {handleNameChange}
      handleNumber = {handleNumberChange}
      setNotification={setDisplayMessage}
      setNotificationStyle={setMessageStyle}/>
      <Numbers showList={showAll} 
      personsList={persons} 
      setNewPersonsList={setPersons}
      filter={newFilter}
      setNotification={setDisplayMessage}
      setNotificationStyle={setMessageStyle}/>
    </div>
  )
}

export default App