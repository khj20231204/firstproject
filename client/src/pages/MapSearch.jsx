import React, { useEffect } from 'react';
import Header from '../components/Header/Header';

const {kakao} = window;

const MapSearch = () => {
   
   useEffect(() => {
      console.log("useEffect 실행")
     
      var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      var options = { //지도를 생성할 때 필요한 기본 옵션
         center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
         level: 3 //지도의 레벨(확대, 축소 정도)
      };
      
      var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
     
      var markerPosition  = new kakao.maps.LatLng(33.450701, 126.570667); 

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
         position: markerPosition
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);

   },[])

   return (
      <>
      <Header/>
      <div className='mapContainer'>
      <div id="map" style={{width:'100vw', height:'100vh'}}></div>
      </div>
      </>
   );
};

export default MapSearch;