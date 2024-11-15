import React, { useEffect, useState } from 'react';
import Location from './Location';

const {kakao} = window;

const MapForm = () => {

  const [position, setPostition] = useState({
    Lat : 33.450701,
    Lng : 126.570667 
  });

  useEffect(() => {
    
    const script = document.createElement("script");
    //script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false`;
    
    script.async = true;
    script.type = "text/javascript";

    script.onload = () => {

    window.kakao.maps.load(() => { 
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center : new kakao.maps.LatLng(position.Lat, position.Lng),
        level : 3
      }
    
      new kakao.maps.Map(mapContainer, mapOption);
    });

  };

  document.head.appendChild(script);

  return () => {
    document.head.removeChild(script);
  };

  }, [position])

   return (
    <div id="map" style={{width: "100vw", height: "100vh"}}></div>
   );
};

export default MapForm;