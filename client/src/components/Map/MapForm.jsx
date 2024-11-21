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
   
   const convert = require('xml-js');

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

  //나의 위치 정보
  let [myLat, setMyLat] = useState(0); 
  let [myLog, setMyLog] = useState(0); 

   //지도 중심 위치
   let [centerLat, setCenterLat] = useState(0);
   let [centerLog, setCenterLog] = useState(0);

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

      getNowLocation(); //위치 초기화
  }, []) //api데이터를 DB에 입력시 [page] 입력

  
  //list가 다운완료가 되면 useEffect가 실행되기 때문에 이때 loading을 false로 셋팅
  useEffect(() => {
       //list를 완전히 받아왔는지 아닌지 loading으로 체크, false이면 다운 완료
      //PharmData(); //첫 페이지 로딩은 전체 약국으로
      stateNameCheckNull();
  }, [list]) //checkPharmData 전체, 주말 약국 버튼을 클릭할 때마다 로딩

  useEffect(() => {
   setLoading(false);
   console.log("useEffect dataList.length:"+dataList.length);
  }, [dataList])

  useEffect(() => {
   console.log("centerLat:"+centerLat+" ,centerLog:"+centerLog+" ,myLat:"+myLat+" ,myLog:"+myLog);

  },[centerLat,centerLog, myLat, myLog])

  //자신의 위치를 받아오는 함수
  const getNowLocation = () => {
   if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){

         var lat = position.coords.latitude
         var lon = position.coords.longitude;

         console.log(lat)
         console.log(lon)

         //지도 중심을 자신의 위치로
         setCenterLat(lat);
         //setCenterLat(37.5128064 );
         setCenterLog(lon);

         //자신의 위치
         setMyLat(lat);
         setMyLog(lon);
      })
   }
  }
  
  //헤더에서 바로 넘어오는지 검색창으로 넘어오는지 판단하는 함수
  const stateNameCheckNull = (check) => {
   if(!loading){ //loading이 완료 되었을 때만 실행되기 위해서 위에 useEffect와 따로 작성

      if(stateName === undefined || countyName === undefined || searchText === undefined) //검색창이 아니라 헤더에 있는 메뉴를 클릭한 경우
      {
         PharmData(check);
      }else{
         if(stateName !== '' || countyName !== '' || searchText !== ''){ //검색을 한 경우
            searchPharmData(check);
         }else{
            PharmData(check); //검색창으로 접근했지만 검색은 하지 않은 경우
         }
      }
   }
  }
  
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
   let markerCount = 0; //마크 건수를 알려주는 변수
   const PharmData = (check) => {

      setLoading(true);
      setDataList([]);

      var pharmData = new Array();

      if(check){
         for(var i=0 ; i<list.length ; i++){ //전국 약국
            markerCount++;
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
               markerCount++;
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

      alert(markerCount + "건 이 검색되었습니다.");
      setDataList([...pharmData]);

      //if(!loading)
         makeMap(pharmData)
   }
   
   //search 항목이 있을 때 실행하게 될 함수
   const searchPharmData = (totalcheck) => {
      //console.log(stateName + " , " +  countyName + " , " + searchText);

      setLoading(true);
      setDataList([]);

      var pharmData = new Array();

      let tempLat; //검색한 결과로 이동하기 위한 임시 위치값
      let tempLng;
      for(var i=0 ; i<list.length ; i++){ //전국 약국

         var addr = list[i].dutyaddr;

         var addrArray = addr.split(" ")
         //console.log(addrArray[0]);
         //console.log(addrArray[1]);

         var state = addrArray[0];
         var county = addrArray[1];
         var sText = list[i].dutyname;

         //console.log(!stateName+ " , " + !countyName + ", " + !searchText);

         var check = true;
         if(stateName && stateName !== state) {check = false;} 
         if(countyName && countyName !== county) {check = false;}
         if(searchText && searchText !== sText) {check = false;}

         //checkPharmData = true 전국 약국, checkPharmData = false 주말 약국
         if(!totalcheck){ //주말약국
            if(list[i].dutyweekendat !== "Y")
               check = false;
         }

         /*
         stateName && stateName !== state
         stateName에 입력값이 없으면 false이기 때문에 if문이 실행 안됨, 입력값이 없으면 자동 통과
         stateName에 입력값이 있는 경우 stateName과 state가 다르면 참이 되어 check는 false가 된다
         if가 실행되면 입력을 하지 않는다
         *공백(빈문자), null, 0, undefined, NaN
         */

         /* console.log("check:"+check+" ,state:"+state+" ,county:"+county);
         console.log("check:"+check+" ,stateName:"+stateName+" ,countyName:"+countyName); */
         
         if(check){
            markerCount++;
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

            tempLat = list[i].lat;
            tempLng = list[i].lon;

         }//if
      }//for
      
      alert(markerCount + "건 이 검색되었습니다.");
      
      setCenterLat(tempLat);
      setCenterLog(tempLng);
      setDataList([...pharmData]);
      
      if(markerCount <= 0){
         navigate(-1);
      }else{
         makeMap(pharmData)
      }
   }

  //맵 생성
  var map;
  const makeMap = (pharmData) => { //전체약국, 주말운영약국을 나눠서 출력하기 위해서 position을 나눠서 입력 받는다

   if(loading) return;

   //if(dataList.length <= 0 ) return;

      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false`;
      script.async = true;
      script.type = "text/javascript";

      script.onload = () => {
         window.kakao.maps.load(() => { 
            const mapContainer = document.getElementById("map");
            const mapOption = {
               //let [myLat, setMyLat] = useState("37.4997799"); 
               //let [myLog, setMyLog] = useState("127.0306391"); 
               //center : new kakao.maps.LatLng(nowLat.current, nowLng.current),
               //center : new kakao.maps.LatLng(35.86733577785442 , 128.58258080835844), 
               center : new kakao.maps.LatLng(centerLat, centerLog),
               level : 3
            }
            
      map = new kakao.maps.Map(mapContainer, mapOption);

      var locPosition = new kakao.maps.LatLng(myLat, myLog);
      var message = `<div style="padding:1px;font-size:13px;width:70px">나의 위치</div>`;
      displayMarker(locPosition, message);

      //마커 표시 -------------------------------------------

        var imageSrc;
        for(var i=0 ; i<pharmData.length ; i++){ 

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
            
            let inforwindow = new kakao.maps.InfoWindow({
               position: pharmData[i].latlng,
               content: iwContent,
               removeable: iwRemoveable
            })

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

        map.setCenter(new kakao.maps.LatLng(centerLat, centerLog));

        //지도 클릭 이벤트
         kakao.maps.event.addListener(map, 'click', function(mouseEvent){
            var latlng = mouseEvent.latLng;

            if(document.getElementById("latpathText") !== null){
              
               console.log("지도 상의 lat:" + latlng.La) //경도
               console.log("지도 상의 lng:" + latlng.Ma) //위도

               document.getElementById("latpathText").value = latlng.Ma;
               document.getElementById("logpathText").value = latlng.La;

               setPathLat(latlng.Ma);
               setPathLog(latlng.La);
            }
         })
        //지도 클릭 이벤트 끝
      }); //maps.load
   };//script.onload

   document.head.appendChild(script);

   return () => {
      document.head.removeChild(script);
   };
  }//makeMap

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
      //map.setCenter(new kakao.maps.LatLng(centerLat,  centerLog));
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
            <Button variant="outline-secondary" style={{margin:10}} onClick={() => /* setCheckPharmData(true) */ stateNameCheckNull(true)}>전체 약국 보기</Button>
            <Button variant="outline-danger" onClick={() => /* setCheckPharmData(false) */ stateNameCheckNull(false)}>주말 운영 약국 보기</Button>
            
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
            
            <div id="map" style={{width: "100vw", height: "85vh"}}></div>
            </div>
         :
            <div style={{alignItems:'center',top:300}}>loading... 데이터를 불러오고 있습니다.</div>
      }
    </>
   );
};

export default MapForm;