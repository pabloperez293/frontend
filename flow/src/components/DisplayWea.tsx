import React from 'react';
import { MainWrapper } from './styled.module';
import { CgSearch } from "react-icons/cg"
import { WiHumidity } from "react-icons/wi"
import { GiBarbedSun } from "react-icons/gi"
import { FaSun, FaCloud, FaCloudRain, FaCloudShowersHeavy } from "react-icons/fa"
import { RiLoaderFill } from "react-icons/ri"
import { TiWeatherPartlySunny, TiWeatherWindy } from "react-icons/ti"
import axios from "axios";

interface WeatherDataProps {
  name: string;

  main: {
    temp: number,
    humidity: number
  },
  sys: {
    country: string;
  },
  weather: {
    main: string;
  }[];
  wind: {
    speed: number;
  },
}

const DisplayWea = () => {

  /* consumicion de Apis */
  const api_key = "11f370f6b49545f3442d3ea3858319f9";
  const api_Endpoint = "https://api.openweathermap.org/data/2.5/";


  // Traera lo que pedimos de interfaace---

  const [weatherData, setWeatherData] = React.useState<WeatherDataProps | null>(null);

  //   spinner ----

  // consumimos el apikey y detallamos datos -------

  const fetchCurrentWeather = async (lat: number, lon: number) => {
    const url = `${api_Endpoint}weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`

    const response = await axios.get(url);
    return response.data;
  }
  // Cambio de color de iconos/colores ------
  const iconChanges = (weather: string) => {
    let iconElement: React.ReactNode;
    let iconColor: string;

    switch (weather) {
      case "Rain":
        iconElement = <FaCloudRain />
        iconColor = "#272829";
        break;
      case "Clear":
        iconElement = <FaSun />
        iconColor = "#FFC436";
        break;
      case "Cloud":
        iconElement = <FaCloud />
        iconColor = "#102C57";
        break;
      case "Mist":
        iconElement = <FaCloudShowersHeavy />
        iconColor = "#279EFF";
        break;
      default:
        iconElement = <GiBarbedSun />
        iconColor = '#7B2869'
    }

    return (
      <span className='icon' style={{ color: iconColor }}>{iconElement}</span>
    )
  };

  // Obtenemos los datos ----

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      // Destrecturamos
      Promise.all([fetchCurrentWeather(latitude, longitude)]).then(
        ([currentWeather]) => {
          setWeatherData(currentWeather)
        }
      )
    })
  })


  return (
    <MainWrapper>
      <div className="container">
        <div className="searchArea">
          <input type="text" placeholder='coloque el pais' />
          <div className="searchCircle">
            <CgSearch className='searchIcon'> </CgSearch>
          </div>
        </div>

        {weatherData && (
          <>
            <div className="weatherArea">
              <h1>{weatherData.name}</h1>
              <span>{weatherData.sys.country}</span>
              <div className="icon">
                {iconChanges(weatherData.weather[0].main)}
              </div>
              <h1>{weatherData.main.temp.toFixed(0)}</h1>
              <h2>{weatherData.weather[0].main}</h2>
            </div>

            <div className="bottomInfoArea">
              <div className="humidityLevel">
                <WiHumidity className='windIcon'></WiHumidity>
                <div className="humidInfo">
                  <h1>{weatherData.main.humidity}%</h1>
                  <p>Humedad</p>
                </div>
              </div>

              <div className="wind">
                <TiWeatherWindy className='windIcon'> </TiWeatherWindy>
                <div className="humidInfo">
                  <h2>{weatherData.wind.speed}km/h</h2>
                  <p>velocidad</p>
                </div>
              </div>
            </div>
          </>
        )}


      </div>
    </MainWrapper>
  )
}

export default DisplayWea