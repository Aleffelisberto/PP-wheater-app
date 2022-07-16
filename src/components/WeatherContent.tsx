import { useEffect, useState } from "react"
import { openMeteoApi } from "../services/OpenMeteoApi"
import { getDayByCode, IDataResponse, weatherCode } from "../data/data"
import { WeatherIcon } from "./WeatherIcon"

export const WeatherContent = () => {
  // today states
  const [temperature, setTemperature] = useState<number>(0)
  const [relativeHumidity, setRelativeHumidity] = useState<number>(0)
  const [maxTemperature, setMaxTemperature] = useState<number>(0)
  const [minTemperature, setMinTemperature] = useState<number>(0)
  const [weatherCondition, setWeatherCondition] = useState<number>(0)
  const [coordinates, setCoordinates] = useState<string>('')
  const [hour, setHour] = useState<number>(0)

  // tomorrow states
  const [tomorrowDay, setTomorrowDay] = useState<string>('')
  const [tomorrowMaxTemperature, setTomorrowMaxTemperature] = useState<number>(0)
  const [tomorrowMinTemperature, setTomorrowMinTemperature] = useState<number>(0)

  // after tomorrow states
  const [afterTomorrowDay, setAfterTomorrowDay] = useState<string>('')
  const [afterTomorrowMaxTemperature, setAfterTomorrowMaxTemperature] = useState<number>(0)
  const [afterTomorrowMinTemperature, setAfterTomorrowMinTemperature] = useState<number>(0)

  useEffect(() => {
    const setForecastData = (data: IDataResponse) => {
      if (data) {
        const { current_weather, hourly, daily } = data

        // today
        const currentDate = new Date()
        const currentHour = currentDate.getHours()
        setTemperature(current_weather.temperature)
        setMaxTemperature(daily.temperature_2m_max[0])
        setMinTemperature(daily.temperature_2m_min[0])
        setWeatherCondition(current_weather.weathercode)
        setRelativeHumidity(hourly.relativehumidity_2m[currentHour - 1])

        //tomorrow
        const tomorrow = new Date(daily.time[1])
        setTomorrowMaxTemperature(daily.temperature_2m_max[1])
        setTomorrowMinTemperature(daily.temperature_2m_min[1])
        setTomorrowDay(getDayByCode(tomorrow.getDay()))

        //after tomorrow
        const afterTomorrow = new Date(daily.time[2])
        setAfterTomorrowMaxTemperature(daily.temperature_2m_max[2])
        setAfterTomorrowMinTemperature(daily.temperature_2m_min[2])
        setAfterTomorrowDay(getDayByCode(afterTomorrow.getDay()))
      } else {
        throw new Error('Data not provided')
      }
    }

    setHour(new Date().getHours())

    const setAllCoordinates = (position: GeolocationPosition) => {
      const concatenatedCoodinates = `${position.coords.latitude},${position.coords.longitude}`
      console.log(concatenatedCoodinates)
      setCoordinates(concatenatedCoodinates)
    }
    // getting current coordinates
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setAllCoordinates)
    }
    const splittedCoordinates = coordinates.split(',')
    const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

    // getting weather information
    openMeteoApi
      .get(`/forecast?latitude=${splittedCoordinates[0]}&longitude=${splittedCoordinates[1]}&current_weather=True&daily=temperature_2m_max,temperature_2m_min&hourly=relativehumidity_2m&timezone=${currentTimezone}`)
      .then(response => {
        setForecastData(response.data)
      })
      .catch(err => console.log(err.message))
  })

  return (
    <div className="flex flex-col items-center justify-center mx-auto bg-black bg-opacity-75 p-[60px] rounded-[50px]">
      <h1 className="leading-tight text-7xl text-white mb-6">{temperature}°C</h1>
      <h2 className="leading-tight text-3xl text-white font-thin mb-4">{weatherCode(weatherCondition)}</h2>
      <WeatherIcon
        code={weatherCondition}
        hour={hour}
      />
      <div className="flex items-center justify-between mb-4 mt-5">
        <span className="block md:text-2xl mr-3 text-1xl font-light">Min: {minTemperature} °C</span>
        <span className="block md:text-2xl text-1xl font-light">Max: {maxTemperature} °C</span>
      </div>
      <p className="mb-14 md:text-2xl text-1xl font-light">Umidade relativa: {relativeHumidity}%</p>
      <div className="flex flex-row w-full justify-between md:text-2xl text-1xl font-thin mb-1">
        <span className="block">{tomorrowDay}</span>
        <span className="block">{tomorrowMinTemperature}°C / {tomorrowMaxTemperature}°C</span>
      </div>
      <div className="flex flex-row w-full justify-between md:text-2xl text-1xl font-thin">
        <span className="block">{afterTomorrowDay}</span>
        <span className="block">{afterTomorrowMinTemperature}°C / {afterTomorrowMaxTemperature}°C</span>
      </div>
    </div>
  )
}
