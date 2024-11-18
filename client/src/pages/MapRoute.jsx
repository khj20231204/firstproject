import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const {Tmapv2} = window;

const MapRoute = () => {

   const location = useLocation();
   const {lat, lon, myLat, myLog} = location.state;

   console.log(lat);
   console.log(lon);
   console.log(myLat);
   console.log(myLog);

   var map;
   var marker_s, marker_e, marker_p;
   var totalMarkerArr = [];
   var drawInfoArr = [];
   var resultdrawArr = [];


   const makeMap = () => {

      const script = document.createElement("script");
      script.src = `https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=${process.env.REACT_APP_TMAP_API_KEY}`;
      script.type = "text/javascript";

      script.onload = () => {

         map = new Tmapv2.Map("map_div", {
            center: new Tmapv2.LatLng(37.5665, 126.9780), // 중심 좌표 (서울시청)
            width: "100%",  // 지도의 가로 크기
            height: "400px", // 지도의 세로 크기
            zoom: 15,         // 초기 줌 레벨
            zoomControl: true,
            scrollwheel: true
          });
      }

      document.head.appendChild(script);

      return () => {
         document.head.removeChild(script);
      }
   }//makeMap

   useEffect(() => {
      initTmap();
   },[])

   function initTmap() {
		// 1. 지도 띄우기
		map = new Tmapv2.Map("map_div", {
		center : new Tmapv2.LatLng(37.56520450, 126.98702028),
			width : "100%",
			height : "800px",
			zoom : 17,
			zoomControl : true,
			scrollwheel : true
		});

		// 2. 시작, 도착 심볼찍기
		// 시작
		marker_s = new Tmapv2.Marker(
				{
<<<<<<< HEAD
					//position : new Tmapv2.LatLng(37.564991,126.983937),
					postition : new Tmapv2.LatLng(37.503551616907366,127.03840705384857),
					icon : "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
=======
					position : new Tmapv2.LatLng(37.564991,126.983937),
					icon : "/upload/tmap/marker/pin_r_m_s.png",
>>>>>>> a0c6d659cb031729c35f4ef021461a44cf1f1de9
					iconSize : new Tmapv2.Size(24, 38),
					map : map
				});

		// 도착
		marker_e = new Tmapv2.Marker(
				{
<<<<<<< HEAD
					//position : new Tmapv2.LatLng(37.566158,126.988940),
					position : new Tmapv2.LatLng(37.5017593,127.0345362),
					icon : "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
=======
					position : new Tmapv2.LatLng(37.566158,126.988940),
					icon : "/upload/tmap/marker/pin_r_m_e.png",
>>>>>>> a0c6d659cb031729c35f4ef021461a44cf1f1de9
					iconSize : new Tmapv2.Size(24, 38),
					map : map
				});

		// 3. 경로탐색 API 사용요청
		var headers = {}; 
			headers["appKey"]=`${process.env.REACT_APP_TMAP_API_KEY}`;

      axios.post(
         "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json",
         {
<<<<<<< HEAD
            startX:"127.03840705384857",//"126.983937",
            startY: "37.503551616907366",//"37.564991",
            endX: "127.0345362",//"126.988940",
            endY: "37.5017593",//"37.566158",
=======
            startX: "126.983937",
            startY: "37.564991",
            endX: "126.988940",
            endY: "37.566158",
>>>>>>> a0c6d659cb031729c35f4ef021461a44cf1f1de9
            reqCoordType: "WGS84GEO",
            resCoordType: "EPSG3857",
            startName: "출발지",
            endName: "도착지"
         },
         { headers: headers }
         )
         .then(response => {
<<<<<<< HEAD
				var resultData = response.data.features;
				console.log(resultData)
=======
        
            var resultData = response.features;
>>>>>>> a0c6d659cb031729c35f4ef021461a44cf1f1de9

					//결과 출력
					var tDistance = "총 거리 : "
							+ ((resultData[0].properties.totalDistance) / 1000)
									.toFixed(1) + "km,";
					var tTime = " 총 시간 : "
							+ ((resultData[0].properties.totalTime) / 60)
									.toFixed(0) + "분";

               var result = document.getElementById("result");
               result.innerText = result;
					//$("#result").text(tDistance + tTime);
					
					//기존 그려진 라인 & 마커가 있다면 초기화
					if (resultdrawArr.length > 0) {
						for ( var i in resultdrawArr) {
							resultdrawArr[i]
									.setMap(null);
						}
						resultdrawArr = [];
					}
					
					drawInfoArr = [];

					for ( var i in resultData) { //for문 [S]
						var geometry = resultData[i].geometry;
						var properties = resultData[i].properties;
						var polyline_;


						if (geometry.type == "LineString") {
							for ( var j in geometry.coordinates) {
								// 경로들의 결과값(구간)들을 포인트 객체로 변환 
								var latlng = new Tmapv2.Point(
										geometry.coordinates[j][0],
										geometry.coordinates[j][1]);
								// 포인트 객체를 받아 좌표값으로 변환
								var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
										latlng);
								// 포인트객체의 정보로 좌표값 변환 객체로 저장
								var convertChange = new Tmapv2.LatLng(
										convertPoint._lat,
										convertPoint._lng);
								// 배열에 담기
								drawInfoArr.push(convertChange);
							}
						} else {
							var markerImg = "";
							var pType = "";
							var size;

							if (properties.pointType == "S") { //출발지 마커
								markerImg = "/upload/tmap/marker/pin_r_m_s.png";
								pType = "S";
								size = new Tmapv2.Size(24, 38);
							} else if (properties.pointType == "E") { //도착지 마커
								markerImg = "/upload/tmap/marker/pin_r_m_e.png";
								pType = "E";
								size = new Tmapv2.Size(24, 38);
							} else { //각 포인트 마커
								markerImg = "http://topopen.tmap.co.kr/imgs/point.png";
								pType = "P";
								size = new Tmapv2.Size(8, 8);
							}

							// 경로들의 결과값들을 포인트 객체로 변환 
							var latlon = new Tmapv2.Point(
									geometry.coordinates[0],
									geometry.coordinates[1]);

							// 포인트 객체를 받아 좌표값으로 다시 변환
							var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
									latlon);

							var routeInfoObj = {
								markerImage : markerImg,
								lng : convertPoint._lng,
								lat : convertPoint._lat,
								pointType : pType
							};

							// Marker 추가
							marker_p = new Tmapv2.Marker(
                     {
                        position : new Tmapv2.LatLng(
                              routeInfoObj.lat,
                              routeInfoObj.lng),
                        icon : routeInfoObj.markerImage,
                        iconSize : size,
                        map : map
                     });
						}
					}//for문 [E]
<<<<<<< HEAD
=======
               alert("ㅇㄴㄹ");
>>>>>>> a0c6d659cb031729c35f4ef021461a44cf1f1de9
					drawLine(drawInfoArr);
            })
            .catch(error => {
            console.error("Error:", error); // 에러 처리
            });

         }

   function addComma(num) {
		var regexp = /\B(?=(\d{3})+(?!\d))/g;
		return num.toString().replace(regexp, ',');
	}
	
	function drawLine(arrPoint) {
      alert(arrPoint);
		var polyline_;

		polyline_ = new Tmapv2.Polyline({
			path : arrPoint,
			strokeColor : "#DD0000",
			strokeWeight : 6,
			map : map
		});
		resultdrawArr.push(polyline_);
	}

   return (
   <div>
      <div id="map_wrap" class="map_wrap3">
      <div id="map_div"></div>
   </div>
   <div class="map_act_btn_wrap clear_box"></div>
   <p id="result"></p>
   <br />
   </div>
   );
};

export default MapRoute;