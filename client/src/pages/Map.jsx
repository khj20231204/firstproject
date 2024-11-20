import React, { useEffect } from 'react';
import MapForm from '../components/Map/MapForm';
import {useLocation} from 'react-router-dom';

const {kakao} = window;

const Map = () => {

   const {state} = useLocation();

   const {stateName, countyName, searchText} = state || {};

   return (
      <div>
         {state ?
            <MapForm stateName={stateName? stateName : ""} countyName={countyName? countyName : ""} searchText={searchText? searchText : ""} />
         :
            <MapForm />
         }
      </div>
   );
};

export default Map;