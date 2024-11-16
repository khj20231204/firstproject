import React, { useEffect, useState } from 'react';
import Location from './Location';
import api from '../../apis/api';
import * as mapapi from '../../apis/mapapi';

const {kakao} = window;

const MapForm = () => {

   //const xml2js = require('xml2js');
   const convert = require('xml-js');

  const [position, setPostition] = useState({
    Lat : 33.450701,
    Lng : 126.570667 
  });

   useEffect(() => {
      fetchData();
      makeMap();
  }, [position])

  const makeMap = () => {
   //카카오 맵 생성
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false`;
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
  }

  //api 데이터 로드 함수
  const fetchData = async () => {

      try{

         let obj = new Object();
         let array = new Array();

         
         let testUrl = encodeURI(`http://safemap.go.kr/openApiService/data/getPharmacyData.do?serviceKey=${process.env.REACT_APP_PHAMARCY_API_KEY}&pageNo=5&numOfRows=1000&type=JSON`);
         let response = await api.get(testUrl);
         //console.log(response);
         const jsonResult = convert.xml2json(response.data, {compact:true, spaces:3}); // Compact : JSON으로 받기, spaces : 들여쓰기
         let data = JSON.parse(jsonResult);

         let itemData = data.response.body.items;

         array.push(itemData.item[4]);
         array.push(itemData.item[5]);

         console.log(array);

         let exam = [
            {name: 'aa', age: 23},
            {name: 'bb', age: 33},
            {name: 'cc', age: 18},
         ]

         await mapapi.savePharmDatas(exam);

      }catch(error){
         console.log(error);
      }
   }

   return (
    <div id="map" style={{width: "100vw", height: "100vh"}}></div>
   );
};

export default MapForm;