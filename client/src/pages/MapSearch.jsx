import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import api from '../apis/api';
import useCurrentLocation from "../hooks/useCurrentLocation";
import useWatchLocation from "../hooks/useWatchLocation";
import { geolocationOptions } from "../constants/geolocationOptions";
import Location from "../components/Map/Location";

const {kakao} = window;

const MapSearch = () => {
   
   const { location: currentLocation, error: currentError } = useCurrentLocation(geolocationOptions);
   const { location, cancelLocationWatch, error } = useWatchLocation(geolocationOptions);
   const [isWatchinForLocation, setIsWatchForLocation] = useState(true);
   
   useEffect(() => {
      getPhamarcyData();
      getMapData();
   },[])

   //카카오 지도를 불러오는 함수
   const getMapData = async () => {
      
    /*   var mylatitude = 37.5030071
      var mylongitude = 127.043370; */
      var mylatitude = 37.5030071
      var mylongitude = 127.041170;

      var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      var options = { //지도를 생성할 때 필요한 기본 옵션
         //center: new kakao.maps.LatLng(37.5030077, 127.0433779), //지도의 중심좌표.
         center: new kakao.maps.LatLng(mylatitude, mylongitude), //지도의 중심좌표.
         level: 3 //지도의 레벨(확대, 축소 정도)
      };

      var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
     
      var positions = [
         {
             title: '카카오', 
             latlng: new kakao.maps.LatLng(mylatitude+0.0003, mylongitude+0.0002)
         },
         {
             title: '생태연못', 
             latlng: new kakao.maps.LatLng(mylatitude, mylongitude)
         },
         {
             title: '텃밭', 
             latlng: new kakao.maps.LatLng(mylatitude, mylongitude)
         },
         {
             title: '근린공원',
             latlng: new kakao.maps.LatLng(mylatitude, mylongitude)
         }
     ];
     
     // 마커 이미지의 이미지 주소입니다
     var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
         
     for (var i = 0; i < positions.length; i ++) {
         
         // 마커 이미지의 이미지 크기 입니다
         var imageSize = new kakao.maps.Size(24, 35); 
         
         // 마커 이미지를 생성합니다    
         var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
         
         // 마커를 생성합니다
         var marker = new kakao.maps.Marker({
             map: map, // 마커를 표시할 지도
             position: positions[i].latlng, // 마커를 표시할 위치
             title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
             image : markerImage // 마커 이미지 
         });
     }

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);
   }

   //약국 api데이터 불러오기
   const getPhamarcyData = async () => {
      
      let testUrl = encodeURI("http://safemap.go.kr/openApiService/data/getPharmacyData.do?serviceKey=AH80S7N7-AH80-AH80-AH80-AH80S7N7P3&pageNo=2&numOfRows=20&type=json");

      let data = await api.post(testUrl.toString());
      console.log(data);
   }

   return (
      <>
      <Header/>
      <div className='mapContainer'>
      <Location location={currentLocation} error={currentError} />
      <div id="map" style={{height:'100vh', left:0, top:0}}></div>
      </div>
      </>
   );
};

export default MapSearch;

