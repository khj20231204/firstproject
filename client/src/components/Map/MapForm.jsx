import React, { useEffect, useState } from 'react';

const {kakao} = window;

const MapForm = () => {

   let [location, setLocation] = useState({
      Lat : 33.450701,
      Lng : 126.570667 
   });

   useEffect(() => {
      const script = document.createElemenf ("script");

      script.src = "";
      script.async = true;

      script.onload = () => {

         window.kakao.maps.load = () => {
            const mapContainer = document.getElementById("map");
            const mapOption = {
               center : location,
               level : 3
            }

            new window.kakao.maps.Map(mapContainer, mapOption);
         }
      }

      document.head.appendChild(script) ;

   })
   
   return (
     <div id="map">

     </div>
   );
};

export default MapForm;