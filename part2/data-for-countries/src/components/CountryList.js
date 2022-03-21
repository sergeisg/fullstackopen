import Country from "./Country"

const CountryList = ({
    countryDisplay, 
    showOneCountry, 
    setShowOneCountry,  
    singleCountry, 
    setSingleCountry}) => {

        const handleClick = (country) => {
            setShowOneCountry(true)
            setSingleCountry(country)
        }
        
        const countriesToDisplay = ({countryDisplay}) => {
            
            if (countryDisplay.length > 10) {
                return 'Too many matches, specify another filter'
            } else if (countryDisplay.length === 1) {
                return <Country countryToDisplay={countryDisplay[0]} />
            } else {
            return countryDisplay.map(country =>
             <div key={country.cca2}>
             <p>{country.name.common}</p>
             <button onClick={() => handleClick(country)}>show</button>
             </div>)
        }
    }
    
    const countriesToShow = showOneCountry 
    ? <Country countryToDisplay={singleCountry} /> 
    : countriesToDisplay({countryDisplay})
      
    return (
        <>
        {countriesToShow}
        </>
      )
}

export default CountryList