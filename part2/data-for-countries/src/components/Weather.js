
const Weather = ({countryInfo, weatherReport}) => {
       
      const toCelsius = (temp) => {
        return Math.round((temp - 273.15)*10/10)
      }

    return (
        <>
        <h3>Weather in {countryInfo.capital[0]}</h3>
        <p>Temperature {toCelsius(weatherReport.main.temp)}ºC</p>
        <img src={`https://openweathermap.org/img/wn/${weatherReport.weather[0].icon}.png`} />
        <p>wind {weatherReport.wind.speed} m/s</p>
        </>
    )
}

export default Weather