import React from 'react';
import { MainWrapper } from './styled.module';
import { CgSearch } from "react-icons/cg"
import { WiHumidity } from "react-icons/wi"
import { GiBarbedSun } from "react-icons/gi"
import { FaSun, FaCloud, FaCloudRain, FaCloudShowersHeavy } from "react-icons/fa"
import { RiLoaderFill } from "react-icons/ri"
import { TiWeatherPartlySunny } from "react-icons/ti"

const DisplayWea = () => {
  
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
          <h1>20c</h1>
          <h2>Soleado</h2>
        </div>

        <div className="bottomInfoArea">
          <div className="humidityLevel">
            <WiHumidity className='windIcon' />
            <div className="humidInfo">
              <h1>20%</h1>
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