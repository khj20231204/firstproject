import React, { createContext, useEffect, useState } from 'react';
import api from './../apis/api';
import Cookies from 'js-cookie';
import * as auth from '../apis/auth';
;

export const LoginContext = createContext();
LoginContext.displayName = 'LoginContextName'

/*
   로그인 
   로그인 체크 : 컴포넌트가 마운트 됐을 때 로그인이 되어있는지 아닌지 체크
   로그인 요청
   로그아웃

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

   

   // 로그인
   const login = async(username, password) => {  //서버에 로그인 요청을 보내고, 응답을 기다림
      console.log(`username : ${username}`);
      console.log(`password : ${password}`);

      const response = await auth.login(username, password); // 로그인 성공 후 처리 로직

      const data = response.data;
      const status = response.status;
      const headers = response.headers;
      const authorization = response.authorization;
      const accessToken = headers.replace("Bearer", "");
      
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

        alert("로그인 성공");
      }

   }

   //로그인 세팅
   const loginSetting = (userData, accessToken) => { //사용자 정보와 토큰값으로 로그인 유무 확인, assessToken => JWT가 된다
      const {no, userId, authList} = userData;
      const roleList = authList.map((auth) => auth.auth);

      console.log(`no : ${no}`);
      console.log(`userId : ${userId}`);
      console.log(`authList : ${authList}`);
      console.log(`roleList : ${roleList}`);

      //axios 객체의 header(Authorization를 jwt토큰으로 셋팅 => Authorization : 'Bearer ${accessToken}`)
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      //쿠키에 accessToken(jwt) 저장 : access , 토큰이 없는 경우 filter에서 이미 거른다
      Cookies.set("accessToken", accessToken)

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

   const logout = () => {
      setLogin(false);
   }
   
  useEffect(() => {
   setTimeout(() => {
      setLogin(true) //3초뒤 setLogin이 true로 
   }, 3000);
  },[])

   return (
      <div>
         <LoginContext.Provider value={{isLogin, logout}}>
            {children}
         </LoginContext.Provider>
      </div>
   );
};

export default LoginContextProvider;