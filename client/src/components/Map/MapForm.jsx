import React, { useEffect, useRef, useState } from 'react';
import Location from './Location';
import api from '../../apis/api';
import * as mapapi from '../../apis/mapapi';
import Button from 'react-bootstrap/Button';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
=======
>>>>>>> 9168ad4addf2d17b52c6c5a329bc4e8b12f65a4f

const {kakao} = window;

const MapForm = () => {

   const convert = require('xml-js');

  const [centerPos, setCenterPos] = useState({
    Lat : 37.5112,
    Lng : 127.04595
  });

<<<<<<< HEAD
  const nowLat = useRef('37.5112');
  const nowLng = useRef('127.04595');

=======
>>>>>>> 9168ad4addf2d17b52c6c5a329bc4e8b12f65a4f
  let [page, setPage] = useState(1); //api uri에 사용할 page, api데이터를 db에 입력시 사용

  const [list, setList] = useState([]); //배열로 선언, api 데이터 받는 list

  const [loading, setLoading] = useState(true); //db에서 list를 가져올 때 까지 map을 읽지 않는다

  const [checkPharmData, setCheckPharmData] = useState(true); 
  //전체약국 버튼 클릭시 true, 주말약국버튼 클릭시 false
  //하나의 PharmData함수에서 처리

<<<<<<< HEAD
  let [pathButton, setPathButton] = useState(false); //false : 경로찾기 버튼 보이기, true : 텍스트 박스

  let [pathLat ,setPathLat] = useState();
  let [pathLog, setPathLog] = useState();

  let [myLat, setMyLat] = useState();
  let [myLog, setMyLog] = useState();

  let navigate = useNavigate();

=======
>>>>>>> 9168ad4addf2d17b52c6c5a329bc4e8b12f65a4f
  /*
  getData() -> PharmData() -> makeMap
  최초 로딩 useEffect()에서 getData() 함수 실행 -> DB에서 데이터를 다 가져오면 setList실행 
  -> list로 입력이 완료되면 loading state를 false로 변경 : 데이터가 2만건이 넘기 때문에 딜레이 발생해서 loading을 따로두고
  useEffect를 나눠서 실행
  -> 첫 페이지는 PharmData에서 전체 약국을 기준으로 출력
  -> 이후 "전체 약국", "주말 운영 약국" 을 클릭할 때마다 checkPharmData 값이 변하고 이때 재랜더링 될 때마다

   useEffect(() => {
   if(!loading){
      PharmData();
   }
  }, [checkPharmData])
  
  가 실행

  PharmData() -> 실제 맵을 그려주는 makeMap 호출
  */

   useEffect(() => {
      //fetchData(); api데이터 DB에 입력하는 함수
      getData(); //DB에 있는 api데이터 가져오기
  }, []) //api데이터를 DB에 입력시 [page] 입력

  
  useEffect(() => {
      setLoading(false); //list를 완전히 받아왔는지 아닌지 loading으로 체크, false이면 다운 완료
      PharmData(); //첫 페이지 로딩은 전체 약국으로
  }, [list]) //checkPharmData 전체, 주말 약국 버튼을 클릭할 때마다 로딩

  useEffect(() => {
   if(!loading){
      PharmData();
   }
  }, [checkPharmData])
  
  
  //DB에서 데이터 가져오기
  const getData = async () => {

      let response;
      try{
         response = await mapapi.getData();
      }catch(error){
         console.log(error);
      }

      setList([...response.data.list]);
      console.log("RDS connect => list");
      console.log(list);
  }

   //전국 약국
   const PharmData = () => {

<<<<<<< HEAD
      setLoading(true);

      var pharmData = new Array();

=======
      var pharmData = new Array();

>>>>>>> 9168ad4addf2d17b52c6c5a329bc4e8b12f65a4f
      if(checkPharmData){//전국 약국
         for(var i=0 ; i<list.length ; i++){
            pharmData.push({
               title : list[i].dutyname,
               latlng : new kakao.maps.LatLng(list[i].lat, list[i].lon),
<<<<<<< HEAD
               dutyweekendat : list[i].dutyweekendat,
               dutyaddr : list[i].dutyaddr,
               dutytel1 : list[i].dutytel1,
               lon : list[i].lon,
               lat : list[i].lat,
               x : list[i].x,
               y : list[i].y
=======
               dutyweekendat : list[i].dutyweekendat
>>>>>>> 9168ad4addf2d17b52c6c5a329bc4e8b12f65a4f
            })
         }
      }else{
         for(var i=0 ; i<list.length ; i++){

            if(list[i].dutyweekendat === "Y"){
               pharmData.push({
                  title : list[i].dutyname,
                  latlng : new kakao.maps.LatLng(list[i].lat, list[i].lon),
<<<<<<< HEAD
                  dutyweekendat : list[i].dutyweekendat,
                  dutyaddr : list[i].dutyaddr,
                  dutytel1 : list[i].dutytel1,
                  lat : list[i].lat,
                  lon : list[i].lon,
                  x : list[i].x,
                  y : list[i].y
=======
                  dutyweekendat : list[i].dutyweekendat
>>>>>>> 9168ad4addf2d17b52c6c5a329bc4e8b12f65a4f
               })
            }
         }
      }

<<<<<<< HEAD
      setLoading(false);
=======
>>>>>>> 9168ad4addf2d17b52c6c5a329bc4e8b12f65a4f
      console.log(pharmData);

      makeMap(pharmData)
   }
   
  //맵 생성
<<<<<<< HEAD
  var map;
=======
>>>>>>> 9168ad4addf2d17b52c6c5a329bc4e8b12f65a4f
  const makeMap = (pharmData) => { //전체약국, 주말운영약국을 나눠서 출력하기 위해서 position을 나눠서 입력 받는다

   if(loading) return;

      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false`;
      script.async = true;
      script.type = "text/javascript";

      script.onload = () => {
         window.kakao.maps.load(() => { 
            const mapContainer = document.getElementById("map");
<<<<<<< HEAD
            //alert(nowLat.current +" , "+ nowLng.current);
            const mapOption = {
               center : new kakao.maps.LatLng(nowLat.current, nowLng.current),
               level : 3
            }
            
      map = new kakao.maps.Map(mapContainer, mapOption);
=======
            const mapOption = {
               center : new kakao.maps.LatLng(centerPos.Lat, centerPos.Lng),
               level : 3
            }
            
         var map = new kakao.maps.Map(mapContainer, mapOption);
>>>>>>> 9168ad4addf2d17b52c6c5a329bc4e8b12f65a4f
            
      //나의 위치 -------------------------------------------
      if(navigator.geolocation){
         navigator.geolocation.getCurrentPosition(function(position){

            var lat = position.coords.latitude, 
               lon = position.coords.longitude;

<<<<<<< HEAD
            setMyLat(lat);
            setMyLog(lon);
            
=======
>>>>>>> 9168ad4addf2d17b52c6c5a329bc4e8b12f65a4f
            var locPosition = new kakao.maps.LatLng(lat, lon),
            message = `<div style="padding:5px;">나의 위치</div>`;

            displayMarker(locPosition, message);
         })
      }else {
         var locPosition = new kakao.maps.LatLng(37.5112,127.04595),
            message = 'geolocation을 사용할 수 없습니다';

            displayMarker(locPosition, message);
      }

<<<<<<< HEAD
=======
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
>>>>>>> 9168ad4addf2d17b52c6c5a329bc4e8b12f65a4f

      //마커 표시 -------------------------------------------

        var imageSrc;
<<<<<<< HEAD
        var check = true;
        var markerInfo = new Array();
        //for(var i=0 ; i<pharmData.length ; i++){ 지우면 안됨
         for(var i=0 ; i<100 ; i++){
            
            markerInfo[i] = pharmData[i];


            if(pharmData[i].dutyweekendat === "Y"){
               imageSrc = "https://github.com/khj20231204/firstproject/blob/main/redmarker.png?raw=true";
            }else{
               imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
            }

            var markerSize = new kakao.maps.Size(24, 35); //마커 크기 설정
            var markerImage = new kakao.maps.MarkerImage(imageSrc, markerSize); //마커 이미지 설정

            let marker = new kakao.maps.Marker({
               map: map, //마커를 표시할 지도
               position: pharmData[i].latlng,
               title: pharmData[i].title,
               image: markerImage,
               clickable: true
            })

            // 마커 위에 인포윈도우 표시 --------------------------------------
            
            let iwContent = `
            <div style="width:100%;height:50px;font-size:12px;background-color:'red'">
            <div>${pharmData[i].title}</div>
            <div>${pharmData[i].dutytel1}</div>
            </div>
            `;

            var iwRemoveable = true;
            
            //var iwPosition = new kakao.maps.LatLng(pharmData[i].lat, pharmData[i].lon);

            let inforwindow = new kakao.maps.InfoWindow({
               position: pharmData[i].latlng,
               content: iwContent,
               removeable: iwRemoveable
            })

            //inforwindow.open(map, marker[i]);
            kakao.maps.event.addListener(marker, 'click', function(mouseEvent) {
               
            });

            kakao.maps.event.addListener(marker,'mouseover', function(){
               inforwindow.open(map, marker);
            })
            
            kakao.maps.event.addListener(marker, 'mouseout', function(){
               inforwindow.close(map, marker);
            })
            // 마커 위에 인포윈도우 표시 끝 -------------------------------------
               
=======
        for(var i=0 ; i<pharmData.length ; i++){
         console.log(pharmData.dutyweekendat);
         if(pharmData[i].dutyweekendat === "Y"){
            imageSrc = "https://github.com/khj20231204/firstproject/blob/main/redmarker.png?raw=true";
         }else{
            imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
         }

         var markerSize = new kakao.maps.Size(24, 35); //마커 크기 설정
         var markerImage = new kakao.maps.MarkerImage(imageSrc, markerSize); //마커 이미지 설정

         var marker = new kakao.maps.Marker({
            map: map, //마커를 표시할 지도
            position: pharmData[i].latlng,
            title: pharmData[i].title,
            image: markerImage
         })
>>>>>>> 9168ad4addf2d17b52c6c5a329bc4e8b12f65a4f
        }
        //마커 표시 끝 -------------------------------------------


<<<<<<< HEAD
        //지도 클릭 이벤트
         kakao.maps.event.addListener(map, 'click', function(mouseEvent){
            var latlng = mouseEvent.latLng;

            if(document.getElementById("latpathText") !== null){
              
               //중심 위치를 지도에서 클릭한 위치로 등록
               nowLat.current = latlng.getLat();
               nowLng.current = latlng.getLng();

               console.log(latlng.La) //경도
               console.log(latlng.Ma) //위도

               document.getElementById("latpathText").value = latlng.Ma;
               document.getElementById("logpathText").value = latlng.La;

               setPathLat(latlng.Ma);
               setPathLog(latlng.La);
            }
            //latlng = latlng.subString(1, len);
            /*
            var len = latlng.length;
            latlng = latlng.subString(0, len-1);
            document.getElementById("pathText").value = latlng;*/
         })
        //지도 클릭 이벤트 끝

        //kakao.maps.event.addListener(map, 'click', function(mouseEvent) { map에서 클릭 이벤트
        //kakao.maps.event.addListener(marker, 'click', function(mouseEvent) { marker에서 클릭 이벤트
        
=======
>>>>>>> 9168ad4addf2d17b52c6c5a329bc4e8b12f65a4f
      }); //maps.load
   };//script.onload

   document.head.appendChild(script);

   return () => {
      document.head.removeChild(script);
   };
  }//makeMap

<<<<<<< HEAD
  let pathButtonSet = () => {
   console.log(pathButton);
   setPathButton(true);
   console.log(pathButton);
  }

  //나의 위치 마커 표시
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
=======
>>>>>>> 9168ad4addf2d17b52c6c5a329bc4e8b12f65a4f
 
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
<<<<<<< HEAD
            <div style={{alignItems:'center',top:300}}>loading...</div>
         :
         <div style={{textAlign:'center'}}>
         <Button variant="outline-secondary" style={{margin:10}} onClick={() => setCheckPharmData(true)}>전체 약국 보기</Button>
         <Button variant="outline-danger" onClick={() => setCheckPharmData(false)}>주말 운영 약국 보기</Button>
         
         {
               pathButton ? 

               <span><span style={{margin:10}}>목적지 Lat : <input type="text" id="latpathText" readOnly></input>Log : <input type="text" id="logpathText" readOnly></input></span><Button variant="outline-primary" style={{margin:10}} onClick={() => {
                  navigate("/MapRoute", {state : {lat: pathLat, lon : pathLog, myLat:myLat, myLog:myLog}});
               }}>찾기</Button><Button variant="outline-primary" style={{margin:10}} onClick={() => setPathButton(false)}>취소</Button></span>
               
               :

               <Button variant="outline-primary" style={{margin:10}} onClick={() => {
                  setPathButton(true)
               }}>경로 찾기</Button>
         }
         
         <div id="map" style={{width: "100vw", height: "100vh"}}></div>
         </div>
=======
            <div style={{alignItems:'center'}}>loading...</div>
         :
         <>
         <Button variant="outline-secondary" style={{margin:10}} onClick={() => setCheckPharmData(true)}>전체 약국 보기</Button><Button variant="outline-danger" onClick={() => setCheckPharmData(false)}>주말 운영 약국 보기</Button>
         <div id="map" style={{width: "100vw", height: "100vh"}}></div>
         </>
>>>>>>> 9168ad4addf2d17b52c6c5a329bc4e8b12f65a4f
      }
    </>
   );
};

export default MapForm;