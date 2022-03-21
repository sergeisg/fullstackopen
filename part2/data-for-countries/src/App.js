import axios from 'axios'
import { useState, useEffect } from 'react'
import CountryList from './components/CountryList'

const App = () => {

  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')
  const [ showOne, setShowOne ] = useState(false)
  const [ oneCountry, setOneCountry ] = useState({})

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        const countries = response.data
        const countriesKey = countries.map(x => ({...x, key: x.name.common}))
        setCountries(countriesKey)
      })
  }, []) 

  const handleChange = (e) => {
    setFilter(e.target.value)
    setShowOne(false)
    setOneCountry({})
  }
  
  const countriesToShow = 
    filter.length>=1 
    ? countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase())) 
    : countries

  return (
    <div>
  
      <form>
        find countries 
        <input value={filter} onChange={handleChange}/>
      </form>
      
      {filter.length>=1 ? <CountryList 
      countryDisplay={countriesToShow} 
      showOneCountry={showOne}
      setShowOneCountry={setShowOne}
      singleCountry={oneCountry}
      setSingleCountry={setOneCountry}
      /> : ''}
      
    </div>
  );
}

export default App;

