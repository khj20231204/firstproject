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

  let [page, setPage] = useState(1); //api uri에 사용할 page

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

  /*
  api데이터 로드 함수 : api에서 데이터를 가져와서 db에 저장하는 기능을 가진 함수
  총 데이터가 24만 건이기 때문에 실시간으로 가져오는데 딜레이가 심해서 db에 저장
  row를 2000으로 설정하고 page를 12페이지까지 증가 시킴   
  page는 useState로 두고 버튼을 누를 때마다 1씩 증가 시키는데 uri의 ${page}값이
  7이상이 되면 에러 발생
  1페이지부터 6페이지까지는 정상 작동   
  uri에 직접 pageNo=7,8,..,12을 입력하면 정상 작동
  useState값으로 7페이지 이상 넘겨주면 에러 발생
  */
  const fetchData = async () => {

      try{

         let obj = new Object();
         let array = new Array();

         let testUrl = encodeURI(`http://safemap.go.kr/openApiService/data/getPharmacyData.do?serviceKey=${process.env.REACT_APP_PHAMARCY_API_KEY}&pageNo=1&numOfRows=2000&type=JSON`);
         let response = await api.get(testUrl);
         //console.log(response);
         const jsonResult = convert.xml2json(response.data, {compact:true, spaces:3}); // Compact : JSON으로 받기, spaces : 들여쓰기
         let data = JSON.parse(jsonResult);

         let itemData = data.response.body.items;
         //console.log(itemData.item.length);

         for(var i=0 ; i<itemData.item.length ; i++)
            array.push(itemData.item[i]);
         
          /* array = 
            [
               {"NUM":1,"DUTYADDR":'대전광역시 동구 계족로 362, 성남약국 1층 (성남동)',"DUTYETC":null,"Y":4348117.714357322,"DUTYWEEKENDAT":'N'},{"NUM":2, "DUTYWEEKENDAT":'N'}
            ] 
 */
         await mapapi.savePharmDatas(array); 

         //console.log(array);
        // let apiJson = JSON.stringify(array);
         //console.log(apiJson);

         //let startIndex = apiJson.indexOf("{ _text :")

         /* array = 
            [
               {"NUM":1,"DUTYADDR":'대전광역시 동구 계족로 362, 성남약국 1층 (성남동)',"DUTYETC":null,"Y":4348117.714357322,"DUTYWEEKENDAT":'N'},{"NUM":2, "DUTYWEEKENDAT":'N'}
            ] */
         
         //console.log(JSON.stringify(array));
         //await mapapi.savePharmDataList(JSON.stringify(array));
         //await mapapi.savePharmDataList(array);

      }catch(error){
         console.log(error);
      }
   }

   return (
   <>
      <div>
         <button onClick={() => {
            setPage(page+1);
         }}>페이지 증가</button> 
         <div>현재 페이지 {page} : 12페이지가 마지막</div>
      </div>
      <div id="map" style={{width: "100vw", height: "100vh"}}></div>
    </>
   );
};

export default MapForm;