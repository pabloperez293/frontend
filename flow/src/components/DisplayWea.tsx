import React from 'react';
import { MainWrapper } from './styled.module';
// Iconos de React-icons
import { CgSearch } from "react-icons/cg"
import { WiHumidity } from "react-icons/wi"
import { GiBarbedSun } from "react-icons/gi"
import { FaSun, FaCloud, FaCloudRain, FaCloudShowersHeavy } from "react-icons/fa"
import { TiWeatherWindy } from "react-icons/ti"
import { RiLoader2Line } from "react-icons/ri"

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
  const [isLoading, setIsLoading] = React.useState(false);

  // Almacenamiento de busqueda de variables
  const [searchCity, setSearchCity] = React.useState("");

  // consumimos el apikey y detallamos datos -------

  const fetchCurrentWeather = async (lat: number, lon: number) => {
    const url = `${api_Endpoint}weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
    const response = await axios.get(url);
    return response.data;
  };

  // Obtendremos el parametro que coloque el usuario y se almacena
  const fetchWeatherData = async (city:string) => {
    try {
      const url = `${api_Endpoint}weather?q=${city}&appid=${api_key}&units=metric`;
      const searchResponse = await axios.get(url);

      const currentWeatherData: WeatherDataProps = searchResponse.data;
      return { currentWeatherData };
    } catch (error) {
      console.error("No estan los datos");
      throw error;
    }
  }
  // Buscador ----------

  const handleSearch = async () => {
    if(searchCity.trim() === ""){
      return;
    }
    try {
      const { currentWeatherData } = await fetchWeatherData(searchCity);
      setWeatherData(currentWeatherData)      
    } catch (error) {
      console.error("No hay resultados");
    }
  };

// Cambio de color de iconos/colores ------
const iconChanges = (weather:string) => {
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
    // Destructuramos
    Promise.all([fetchCurrentWeather(latitude, longitude)]).then(
      ([currentWeather]) => {
        setWeatherData(currentWeather);
        setIsLoading(true);
        // console.log(currentWeather);
      }
    );
  });
}, []);


return (
  <MainWrapper>
    <div className="container">
      <div className="searchArea">
        <input type="text" placeholder='coloque el pais' value={searchCity}
          onChange={(evt) => setSearchCity(evt.target.value)} />

{/* Buscador */}
        <div className="searchCircle">
          <CgSearch className='searchIcon' onClick={handleSearch} />
        </div>
      </div>

      {weatherData && isLoading ? (
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
              <WiHumidity className='windIcon' />
              <div className="humidInfo">
                <h1>{weatherData.main.humidity}%</h1>
                <p>Humedad</p>
              </div>
            </div>

            <div className="wind">
              <TiWeatherWindy className='windIcon' />
              <div className="humidInfo">
                <h2>{weatherData.wind.speed}km/h</h2>
                <p>velocidad</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="loading">
          <RiLoader2Line className='loadingIcon'/>
          <p>Cargando..</p>
        </div>
      )}
    </div>
  </MainWrapper>
  );
};

export default DisplayWea