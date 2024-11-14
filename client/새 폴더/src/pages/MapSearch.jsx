
import { useEffect, useRef, useState } from 'react';
import Header from '../components/Header/Header';
/* import { Map, MapMarker } from "react-kakao\-maps-sdk" */
import Location from '../components/Map/Location';
import useCurrentLocation from '../hooks/useCurrentLocation';
import { geolocationOptions } from '../constants/geolocationOptions';
import api from '../apis/api';


const {kakao} = window;

const MapSearch = () => {
   
   //현재 나의 위치 가져오기
   const { location: currentLocation, error: currentError } = useCurrentLocation(geolocationOptions);
   
   const [isOpen, setIsOpen] = useState(); //마크 클릭시 이벤트 값 설정

   // 지도의 초기 위치 설정
   const [state, setState] = useState({
      center: { lat: 37.4923615, lng: 127.0292881 },
      // 지도 위치 변경시 panto를 이용할지에 대해서 정의 : panto 부드러운 이동
      isPanto: false,
   })

   const [data, setData] = useState({
      leve : 0,
      position : {
         lat : 0,
         lng : 0
      }
   })

   useEffect(() => {

      getPhamarcyData();
      
   },[])
   

     //약국 api데이터 불러오기
   const getPhamarcyData = async () => {
      
      let testUrl = encodeURI("http://safemap.go.kr/openApiService/data/getPharmacyData.do?serviceKey=AH80S7N7-AH80-AH80-AH80-AH80S7N7P3&pageNo=1&numOfRows=2000&type=JSON");

      /* 
      100단위로 1개의 업체
      row 10 : 0 ~ 300
      row 20 : 0 ~ 600 
      row 30 : 0 ~ 900 
      row 40 : 0 ~ 1200

      row 100 : 0 ~ 3200
      row 1000 : 0 ~ 30000
      row 2000 : 0 ~ 60000
      */
      let data = await api.post(testUrl.toString());
      console.log(data);
   }
   
   const markerData = [
      { lat: 37.5665, lng: 126.9780, name: '서울' },
      { lat: 35.1796, lng: 129.0756, name: '부산' },
      { lat: 37.4563, lng: 126.7052, name: '인천' },
      { lat: 35.1595, lng: 126.8526, name: '광주' },
      { lat: 35.8722, lng: 128.6014, name: '대구' },
    ];

   return (
      <>
      <Header/>
      <Location location={currentLocation} error={currentError} />
      <div className='mapContainer'>

      
      </div>
      </>
   );
};

export default MapSearch;


