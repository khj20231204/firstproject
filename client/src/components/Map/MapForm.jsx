import React, { useEffect, useRef, useState } from 'react';
import api from '../../apis/api';
import * as mapapi from '../../apis/mapapi';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


const {kakao} = window;

const MapForm = ({stateName, countyName, searchText}) => { //매개변수 PharMain.jsx -> Map.jsx 에서 넘겨받은 값

   /* 
   stateName 없으면 null
   countyName 없으면 null
   searchText 없으면 "" 빈칸
   */
   console.log(stateName + " , " +  countyName + " , " + searchText);

   const convert = require('xml-js');

  //37.4997799 , 127.0306391
  let nowLat = useRef("37.4997799");
  let nowLng = useRef("127.0306391");

  let [page, setPage] = useState(1); //api uri에 사용할 page, api데이터를 db에 입력시 사용

  const [list, setList] = useState([]); //배열로 선언, api 데이터 받는 전체 list

  const [dataList, setDataList] = useState([]); //주말진료나 검색 이후 만들어진 list

  const [loading, setLoading] = useState(true); //db에서 list를 가져올 때 까지 map을 읽지 않는다

  const [checkPharmData, setCheckPharmData] = useState(true); 
  //전체약국 버튼 클릭시 true, 주말약국버튼 클릭시 false
  //하나의 PharmData함수에서 처리

  let [pathButton, setPathButton] = useState(false); //false : 경로찾기 버튼 보이기, true : 텍스트 박스

  //도로 위 위치
  let [pathLat ,setPathLat] = useState();
  let [pathLog, setPathLog] = useState();

  let [mLat, setMLat] = useState();
  let [mLng, setMLng] = useState();

  let [myLat, setMyLat] = useState(); //나의 위치 정보
  let [myLog, setMyLog] = useState(); //나의 위치 정보

  let navigate = useNavigate();

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

   //전체, 주말, 검색 이후 약국 목록
   const PharmData = () => {

      setLoading(true);
      setDataList([]);

      var pharmData = new Array();

      if(checkPharmData){
         for(var i=0 ; i<list.length ; i++){ //전국 약국
            pharmData.push({
               title : list[i].dutyname,
               latlng : new kakao.maps.LatLng(list[i].lat, list[i].lon),
               dutyweekendat : list[i].dutyweekendat,
               dutyaddr : list[i].dutyaddr,
               dutytel1 : list[i].dutytel1,
               lon : list[i].lon,
               lat : list[i].lat,
               x : list[i].x,
               y : list[i].y
            })
         }
      }else{
         for(var i=0 ; i<list.length ; i++){

            if(list[i].dutyweekendat === "Y"){ //주말 운영 약국
               pharmData.push({
                  title : list[i].dutyname,
                  latlng : new kakao.maps.LatLng(list[i].lat, list[i].lon),
                  dutyweekendat : list[i].dutyweekendat,
                  dutyaddr : list[i].dutyaddr,
                  dutytel1 : list[i].dutytel1,
                  lat : list[i].lat,
                  lon : list[i].lon,
                  x : list[i].x,
                  y : list[i].y
               })
            }
         }
      }

      setLoading(false);
      console.log(pharmData);
      setDataList([...pharmData]);

      makeMap(pharmData)
   }
   
  //맵 생성
  var map;
  const makeMap = (pharmData) => { //전체약국, 주말운영약국을 나눠서 출력하기 위해서 position을 나눠서 입력 받는다

   if(loading) return;

      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false`;
      script.async = true;
      script.type = "text/javascript";

      script.onload = () => {
         window.kakao.maps.load(() => { 
            const mapContainer = document.getElementById("map");
            //alert(nowLat.current +" , "+ nowLng.current);
            const mapOption = {
               center : new kakao.maps.LatLng(nowLat.current, nowLng.current),
               level : 3
            }
            
      map = new kakao.maps.Map(mapContainer, mapOption);
            
      //나의 위치 -------------------------------------------
      if(navigator.geolocation){
         navigator.geolocation.getCurrentPosition(function(position){

            var lat = position.coords.latitude, 
               lon = position.coords.longitude;

            setMyLat(lat);
            setMyLog(lon);
            
            var locPosition = new kakao.maps.LatLng(lat, lon),
            message = `<div style="padding:5px;">나의 위치</div>`;

            displayMarker(locPosition, message);
         })
      }else {
         var locPosition = new kakao.maps.LatLng(37.5112,127.04595),
            message = 'geolocation을 사용할 수 없습니다';

            displayMarker(locPosition, message);
      }


      //마커 표시 -------------------------------------------

        var imageSrc;
        var check = true;
        var markerInfo = new Array();
        for(var i=0 ; i<pharmData.length ; i++){ //지우면 안됨
        /*  for(var i=0 ; i<100 ; i++){ */
            
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
               let mPosition = marker.getPosition();
               let mLat = mPosition.getLat();
               let mLng = mPosition.getLng();

               if(document.getElementById("latpathText") !== null){
                  document.getElementById("latpathText").value = mLat;
                  document.getElementById("logpathText").value = mLng;
               }

               setPathLat(mLat);
               setPathLog(mLng);
            });

            kakao.maps.event.addListener(marker,'mouseover', function(){
               inforwindow.open(map, marker);
            })
            
            kakao.maps.event.addListener(marker, 'mouseout', function(){
               inforwindow.close(map, marker);
            })
            // 마커 위에 인포윈도우 표시 끝 -------------------------------------
               
        }
        //마커 표시 끝 -------------------------------------------


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
        
      }); //maps.load
   };//script.onload

   document.head.appendChild(script);

   return () => {
      document.head.removeChild(script);
   };
  }//makeMap

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
         (dataList.length !== 0) ? 

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
         :
            <div style={{alignItems:'center',top:300}}>loading... 데이터를 불러오고 있습니다.</div>
      }
    </>
   );
};

export default MapForm;