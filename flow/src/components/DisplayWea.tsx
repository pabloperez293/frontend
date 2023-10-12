import React from 'react';
import { MainWrapper } from './styled.module';
import { CgSearch } from "react-icons/cg"
import { WiHumidity } from "react-icons/wi"
import { GiBarbedSun } from "react-icons/gi"
import { FaSun, FaCloud, FaCloudRain, FaCloudShowersHeavy } from "react-icons/fa"
import { RiLoaderFill } from "react-icons/ri"
import { TiWeatherPartlySunny } from "react-icons/ti"
import axios from "axios";

const DisplayWea = () => {

  const api_key = "11f370f6b49545f3442d3ea3858319f9";
  const api_Endpoint = "https://api.openweathermap.org/data/2.5/";

  // consumimos el apikey y detallamos datos -------

  const fetchCurrentWeather = async(lat:number, lon:number) => {
    const url = `${api_Endpoint}weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`

    const response = await axios.get(url);
    return response.data;
  }

  // Obtenemos los datos ----

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
  // Destrecturamos
      Promise.all([fetchCurrentWeather(latitude, longitude)]).then(
        ([ currentWeather]) => {
          console.log(currentWeather)
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
            <CgSearch className='searchIcon' />
          </div>
        </div>

        <div className="weatherArea">
          <h1>Argentina</h1>
          <span> buenos aires</span>
          <div className="icon">
            icon
          </div>
          <h1>12C°</h1>
          <h2>Soleado</h2>
        </div>

        <div className="bottomInfoArea">
          <div className="humidityLevel">
            <WiHumidity className='windIcon' />
            <div className="humidInfo">
              <h1>43 %</h1>
              <p>Humedad</p>
            </div>
          </div>

          <div className="wind">
            <GiBarbedSun className='windIcon' />
            <div className="humidInfo">
              <h2>2.35km/h</h2>
              <p>velocidad</p>
            </div>
          </div>
        </div>
      </div>
    </MainWrapper>
  )
}

export default DisplayWea