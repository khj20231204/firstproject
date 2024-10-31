import React, { createContext, useEffect, useState } from 'react';
import api from './../apis/api';
import Cookies from 'js-cookie';
import * as auth from '../apis/auth';
import LoginContextConsumer from './LoginContextConsumer';
import { useNavigate } from 'react-router-dom';
;

export const LoginContext = createContext();
LoginContext.displayName = 'LoginContextName'

/*
   1) 로그인 요청: 사용자가 아이디와 비밀번호를 입력하고 로그인 버튼을 누르면, 클라이언트(브라우저)는 서버로 로그인 요청을 보냅니다.
   2) 서버 인증: 서버는 받은 아이디와 비밀번호를 데이터베이스나 다른 저장소에 저장된 정보와 비교하여 유효성을 검증합니다.
   3) 액세스 토큰 발급 (또는 세션 생성): 인증이 성공하면 서버는 클라이언트에게 액세스 토큰을 발급하거나, 세션을 생성하여 클라이언트에게 세션 ID를 보냅니다. 액세스 토큰은 클라이언트가 자신을 식별하고 보호된 자원에 접근할 수 있도록 하는 일종의 증명서 역할을 합니다.
   4) 클라이언트 저장: 클라이언트는 받은 액세스 토큰(또는 세션 ID)을 로컬 스토리지(localStorage, sessionStorage) 또는 쿠키에 저장합니다.
   5) 로그인 성공: 클라이언트는 받은 토큰을 헤더에 포함하여 서버에 요청을 보내면, 서버는 토큰을 검증하고 사용자를 인증합니다. 이후 사용자는 로그인된 상태로 서비스를 이용할 수 있습니다.
   6) 로그인 상태 유지: 클라이언트는 매 요청마다 토큰을 포함하여 서버에 보내고, 서버는 토큰의 유효성을 검증하여 사용자의 로그인 상태를 유지합니다.

   로그인이 된 상태를 체크하는 기능 : state를 어떻게 바꿀 것이냐
   로그아웃이 된 상태를 체크하는 기능 : state를 어떻게 바꿀 것이냐
*/

const LoginContextProvider = ({ children }) => {

   /*
      상태
      - 로그인 여부
      - 유저 정보
      - 권한 정보
      - 아이디 저장
   */

   //context value : 로그인 여부, 로그아웃 함수
   const[isLogin, setLogin] = useState(false);

   //유저 정보
   const [userInfo, setUserInfo] = useState({}); //유저 정보를 객체로 관리

   //권한 정보
   const [roles, setRoles] = useState({isUser : false, isAdmin : false}); //사용자인지 관리자인지 객체로 저장

   //아이디 저장
   const [remberUserId, setRemberUserId] = useState();

   const navigate = useNavigate();

   const [ch, setCh] = useState();

   /* 
      처음 로그인을 하면 jwt토큰 응답을 받은 상태, 
      토큰을 가지고 다시 서버측에 유저 정보를 응답해주는 요청을 전송 
      쿠키를 가져와서 쿠키 안에 유저 정보를 요청하는 것도 여기서 실행 
      쿠키에 jwt가 있는지 확인
      jwt로 사용자 정보를 요청

      /login     --- id,pw --->  server : ok
      쿠키에 저장 <---jwt---      server가 jwt 전송
      /user/info --- jwt--->     server
      :jwt에서 토큰을 header에 담아야 server로 보낼 수 있다
                 <--- {user} ---   server
   */
   const loginCheck = async () => {
      console.log("-------------- loginCheck ------------------");

      //쿠키에서 jwt 토큰 가져오기
      const accessToken = Cookies.get("accessToken");
      console.log('accessToken:' + accessToken);

      //------ header에 jwt 담기 ------
      //accessToken(jwt)이 없음
      if(!accessToken){
         console.log("쿠키에 accessToken이 없음");
         //로그아웃 세팅
         logoutSetting()
         return;
      }

      //accessToken(jwt)이 있음 - 바로 header에 담는다
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`
      
      //사용자 정보 요청
      let response
      let data
      

      //헤더에 토큰을 저장하고 

         response = await auth.info();


      data = response.data;

      console.log(`data : ${data}`);

      //인증 성공
      //로그인 세팅
      loginSetting(data, accessToken)
   }

   // 로그인 : 로그인 버튼을 누르면 호출됨
   const login = async(username, password) => {
      console.log("-------------- login ------------------");

      console.log(`username : ${username}`);
      console.log(`password : ${password}`);

      const response = await auth.login(username, password);

      console.log("------client ContextProvider login에서 response : " + response);
      console.log(response);
      console.log("------client ContextProvider login에서 response.data : " + response.data);

      const data = response.data;
      const status = response.status;
      const headers = response.headers;

      const authorization = headers.authorization;
      const accessToken = authorization.replace("Bearer ", ""); //JWT, jwt만으로는 유저 정보를 알 수 없음, 위에 loginCheck가 필요한 이유
      
      console.log(`data: ${data}`);
      console.log(`status: ${status}`);
      console.log(`headers: ${headers}`);
      console.log(`authorization: ${authorization}`);
      console.log(`accessToken: ${accessToken}`);

      //로그인 성공
      //status가 200으로 응답하면 로그인 성공
      if(status === 200){
         //토큰자체에는 암호화 되어서 들어있다, header, payload, signure가 들어있다
         //로그인 체크 (/users/{userId} <--- userData)
         
         //쿠키에 accessToken(jwt) 저장 : access , 토큰이 없는 경우 filter에서 이미 거른다
         //로그인이 성공되었을 때 jwt를 받아서 쿠키에 저장해야 사용자 정보가 쿠키에 들어가 있다
         Cookies.set("accessToken", accessToken)
         
         //로그인 체크 ( /users/{userId} <-- userData)
         loginCheck();

         alert("로그인 성공");

         //메인 페이지로 이동
         navigate("/");
      }
   }

   //로그인 세팅
   const loginSetting = (userData, accessToken) => { //사용자 정보와 토큰값으로 로그인 유무 확인, assessToken => JWT가 된다

      console.log("-------------- loginSetting ------------------");

      const {no, userId, authList} = userData;
      const roleList = authList.map((auth) => auth.auth);

      console.log(`no : ${no}`);
      console.log(`userId : ${userId}`);
      console.log(`authList : ${authList}`);
      console.log(`roleList : ${roleList}`);

      //axios 객체의 header(Authorization를 jwt토큰으로 셋팅 => Authorization : 'Bearer ${accessToken}`)
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      //로그인 여부 : true
      setLogin(true);

      //유저정보 세팅
      const updateUserInfo = {no, userId, roleList};
      setUserInfo(updateUserInfo);

      //권한정보 세팅
      const updateRoles = {isUser : false, isAdmin : false}

      roleList.forEach((role) => {
         if(role === 'ROLE_USER') updateRoles.isUser = true;
         if(role === 'ROLE_ADMIN') updateRoles.isAdmin = true; 
      });

      setRoles(updateRoles);
   }

   //로그아웃 셋팅
   const logoutSetting = () => {

      console.log("-------------- logoutSetting ------------------");

      //axios 헤더 초기화
      api.defaults.headers.common.Authorization = undefined;

      //쿠키 초기화
      Cookies.remove("accessToken");

      //로그인 여부 : false
      setLogin(false);

      //유저 정보 초기화
      setUserInfo(null);

      //권한 정보 초기화
      setRoles(null);
   }

   //로그 아웃
   const logout = () => {

      if(window.confirm("로그아웃 하시겠습니까?")){

         //로그아웃 세팅
         logoutSetting();

         //홈으로 이동
         navigate("/");
      }
   }
   
   return (
      <div>
         <LoginContext.Provider value={{isLogin, userInfo, roles, login, logout}}>
            {children}
         </LoginContext.Provider>
      </div>
   );
};

export default LoginContextProvider;