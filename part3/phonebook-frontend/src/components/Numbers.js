import Person from './Person'
const Numbers = ({
    showList, 
    personsList, 
    setNewPersonsList, 
    filter, 
    setNotification,
    setNotificationStyle}) => {
    const numbersToShow = showList ? personsList 
    : personsList.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase()))
    return(
        <>
        <h3>Numbers</h3>
        <ul>
         {numbersToShow.map(x=>
         <Person 
         key={x.id}
         eachPerson={x} 
         persons={numbersToShow} 
         setPersons={setNewPersonsList}
         setDisplayMessage={setNotification}
         setDisplayMessageStyle={setNotificationStyle}
         />)}
        </ul>
        </>
    )
}

export default Numbers
