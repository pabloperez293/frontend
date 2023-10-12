import React from 'react';
import { MainWrapper } from './styled.module';
import { ImSearch } from 'react-icons'

const DisplayWea = () => {
  return (
    <MainWrapper>
      <div className="container">
        <div className="searchArea">
          <input type="text" placeholder='coloque el pais' />
        </div>
        <div className="searchCircle">
          <ImSearch></ImSearch>
        </div>

        </div>
        
    </MainWrapper>
  )
}

export default DisplayWea