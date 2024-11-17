import React, { useEffect, useState } from 'react';
import Location from './Location';
import api from '../../apis/api';
import * as mapapi from '../../apis/mapapi';
import Button from 'react-bootstrap/Button';

const {kakao} = window;

const MapForm = () => {

   //const xml2js = require('xml2js');
   const convert = require('xml-js');

  const [centerPos, setCenterPos] = useState({
    Lat : 37.5112,
    Lng : 127.04595
  });

  let [page, setPage] = useState(1); //api uri에 사용할 page, api데이터를 db에 입력시 사용

  const [list, setList] = useState([]); //배열로 선언, api 데이터 받는 list

  const [loading, setLoading] = useState(true); //db에서 list를 가져올 때 까지 map을 읽지 않는다

   useEffect(() => {
      //fetchData(); api데이터 DB에 입력하는 함수
      getData(); //DB에 있는 api데이터 가져오기
  }, []) //api데이터를 DB에 입력시 [page] 입력

  //list를 완전히 받아왔는지 아닌지 loading으로 체크
  useEffect(() => {
      setLoading(false); //false이면 다운 완료
      makeMap();
  }, [list])

  //DB에서 데이터 가져오기
  const getData = async () => {

      let response;
      try{
         response = await mapapi.getData();
      }catch(error){
         console.log(error);
      }

      setList([...response.data.list]);
  }

   //전국 약국
   const allPharm = () => {
      setLoading(true); //데이터를 가져오기 전에 먼저 loading 설정
   
     }
   
   //주말 운영 약국
   const weekendPharm = () => {
      setLoading(true); //데이터를 가져오기 전에 먼저 loading 설정
     }

     
  //맵 생성
  const makeMap = () => { //전체약국, 주말운영약국을 나눠서 출력하기 위해서 position을 나눠서 입력 받는다

   if(loading) return;

      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false`;
      script.async = true;
      script.type = "text/javascript";

      script.onload = () => {
         window.kakao.maps.load(() => { 
            const mapContainer = document.getElementById("map");
            const mapOption = {
               center : new kakao.maps.LatLng(centerPos.Lat, centerPos.Lng),
               level : 3
            }
            
         var map = new kakao.maps.Map(mapContainer, mapOption);
            
      //나의 위치 -------------------------------------------
      if(navigator.geolocation){
         navigator.geolocation.getCurrentPosition(function(position){

            var lat = position.coords.latitude, 
               lon = position.coords.longitude;

            var locPosition = new kakao.maps.LatLng(lat, lon),
            message = `<div style="padding:5px;">나의 위치</div>`;

            displayMarker(locPosition, message);
         })
      }else {
         var locPosition = new kakao.maps.LatLng(37.5112,127.04595),
            message = 'geolocation을 사용할 수 없습니다';

            displayMarker(locPosition, message);
      }

      function displayMarker(locPosition, message){
         var marker = new kakao.maps.Marker({
            map: map,
            position: locPosition
         })

         var iwContent = message,
            iwRemoveable = true;

         var infowindow = new kakao.maps.InfoWindow({
            content : iwContent,
            removable : iwRemoveable
         })

         infowindow.open(map, marker);

         map.setCenter(locPosition);
      }

      //마커 표시 -------------------------------------------
        var position = new Array();
        
         for(var i=0 ; i<list.length ; i++){
            position.push({
               title : list[i].dutyname,
               latlng : new kakao.maps.LatLng(list[i].lat, list[i].lon)
            })
         }

        console.log(position);

        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 

        
        for(var i=0 ; i<position.length ; i++){

         var markerSize = new kakao.maps.Size(24, 35); //마커 크기 설정
         var markerImage = new kakao.maps.MarkerImage(imageSrc, markerSize); //마커 이미지 설정

         var marker = new kakao.maps.Marker({
            map: map, //마커를 표시할 지도
            position: position[i].latlng,
            title: position[i].title,
            image: markerImage
         })
        }
        //마커 표시 끝 -------------------------------------------


      }); //maps.load
   };//script.onload

   document.head.appendChild(script);

   return () => {
      document.head.removeChild(script);
   };
  }//makeMap

 
  /*
  api데이터 로드 함수 : api에서 데이터를 가져와서 db에 저장하는 기능을 가진 함수
  총 데이터가 24만 건이기 때문에 실시간으로 가져오는데 딜레이가 심해서 db에 저장
  row를 2000으로 설정하고 page를 12페이지까지 증가 시킴   
  page는 useState로 두고 버튼을 누를 때마다 1씩 증가 시키는데 uri의 ${page}값이
  7이상이 되면 에러 발생
  1페이지부터 4페이지까지는 정상 작동   
  5페이지부터 8페이지까지 서버쪽에서 값을 제대로 못 넘김
  9페이지 13페이지까지 정상 작동
  */
 //api데이터를 DB에 입력하는 함수
  const fetchData = async () => {

      try{

         let obj = new Object();
         let array = new Array();

         let testUrl = encodeURI(`http://safemap.go.kr/openApiService/data/getPharmacyData.do?serviceKey=${process.env.REACT_APP_PHAMARCY_API_KEY}&pageNo=${page}&numOfRows=2000&type=JSON`);
         let response = await api.get(testUrl);
         //console.log(response);
         const jsonResult = convert.xml2json(response.data, {compact:true, spaces:3}); // Compact : JSON으로 받기, spaces : 들여쓰기
         let data = JSON.parse(jsonResult);

         let itemData = data.response.body.items;
         console.log(itemData.item.length);

         for(var i=0 ; i<itemData.item.length ; i++)
            array.push(itemData.item[i]);
   
         /* await mapapi.savePharmDatas(array);  
         여기 풀면 첫번째 데이터는 바로 입력
         이후부터 버튼으로 page 증가*/

      }catch(error){
         console.log(error);
      }
   }

   return (
   <>
   {/* 
      <div>
      <button onClick={() => {
         setPage(page+1);
      }}>페이지 증가</button> 
      <div>현재 페이지 {page} : 12페이지가 마지막</div> 
      </div>
   */}
      {
         loading ? 
            <div style={{textAlign:'center'}}>loading...</div>
         :
         <>
         <Button variant="outline-secondary" style={{margin:10}} onClick={allPharm}>전체 약국 보기</Button><Button variant="outline-danger" onClick={weekendPharm}>주말 운영 약국 보기</Button>
         <div id="map" style={{width: "100vw", height: "100vh"}}></div>
         </>
      }
    </>
   );
};

export default MapForm;