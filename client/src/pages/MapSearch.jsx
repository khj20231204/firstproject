
import { useEffect, useRef, useState } from 'react';
import Header from '../components/Header/Header';
import { Map, MapMarker } from "react-kakao-maps-sdk"
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

      <Map id="map" center={ state.center } style={{height:'700px', left:0, top:0}} level={3}
         
         //마커를 클릭 했을 때 클릭한 지점 위치 가져오기
         /*
         onClick={(map) => {
            
            const level = map.getLevel()
            const latlng = map.getCenter()
            console.log("level:"+level+ " ,latlng:"+latlng);

            setData({
              level: level,
              position: {
                lat: latlng.getLat(),
                lng: latlng.getLng(),
              },
            })
         }}*/
         
         
         onClick ={(map) => {
            const bound = map.getBounds();
            
            console.log(bound);
            /*
            ha : 127.04040107734225
            oa : 127.06192411678124
            pa : 37.495450595492855
            qa : 37.48915286589599
            */

            //markerData라는 예시 lat, lng값에서 현재 지도에 보이는 bound에 해당하는지 하지 않는지 filter 수행
            const visibleMarkers = markerData.filter((data) => {
               const position = new kakao.maps.LatLng(data.lat, data.lng);
               return bound.contain(position);
            })
            
            //새로운 마커 추가

         }}
         
   

         >

         <MapMarker // 나의 위치 마커 표시
            position={{
               // 마커가 표시될 위치입니다
               lat: 37.5000015,
               lng: 127.0305781,
            }}

            image={{
               src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 마커이미지의 주소입니다
               size: {
                  width: 64,
                  height: 69,
               }, // 마커이미지의 크기입니다
               options: {
                  offset: {
                  x: 27,
                  y: 69,
                  }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
               },
            }} 
         />

         <MapMarker position={{ lat: 37.4913514, lng:  127.0292852}}/>

      </Map>
      </div>
      </>
   );
};

export default MapSearch;


