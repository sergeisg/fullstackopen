
const Filter = ({filter, handleFilter, showSetter}) => {

    const triggerFilter = (value) => {
        value === '' ? showSetter(true) : showSetter(false)
      }
    return (
        <>
        filter by name <input 
        value={filter}
        onChange={e => {handleFilter(e); triggerFilter(filter)} }></input>
      </>
    )
    
}

export default Filter
