import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import UserForm from '../components/User/UserForm';
import * as auth from '../apis/auth';
import { LoginContext } from '../contexts/LoginContextProvider';
import { useNavigate } from 'react-router-dom';

const User = () => {

   const [userInfo, setUserInfo] = useState();

   //비밀번호 수정 시 비밀번호를 수정하고 logout을 호출하기 위해서 useContext에서 logout 함수를 받아온다
   const {logout} = useContext(LoginContext);

   let navigate = useNavigate();

   /* 
   이 페이지에 올 때마다 수정된 사용자 정보를 가져와서 UserForm으로 내려준다.
   컴포넌트는 재사용을 할 수도 있기 때문에 page에서 값을 받아서 전달한다
    */

   //회원 정보 조회 - /user/info
   const getUserInfo = async () => {

      const response = await auth.info();
      const data = response.data;
      console.log("getUserInfo ----------------")
      console.log(data);

      setUserInfo(data);
   }

   //회원 정보 수정
   const updateUser = async (form) => {
      console.log("user.jsx의 updateUser함수")
      console.log(form)

      let response;
      let data;

      try{
         response = await auth.update(form);
      }catch(error){
         console.log(`${error}`);
         console.log('회원정보 수정 중 에러 발생');
         return;
      }

      data = response.data;
      const status = response.status;

      console.log(`data : ${data}`);
      console.log(`status : ${status}`);

      if(status === 200){
         console.log('회원정보 수정 성공');
         alert('회원정보 수정 성공')
         navigate('/');

         //비밀번호 수정이면 logout처리
         //logout();
      }else{
         console.log('회원정보 수정 실패');
         alert('회원정보 수정 실패')
      }
   }

   //회원 탈퇴
   const deleteUser = async (userId) => {

      let answer = window.confirm("계정을 삭제하시겠습니까?");

      if(!answer) return;

      console.log("delete userId : " + userId);

      let response;
      let data;

      try{
         response = await auth.remove(userId);
      }catch(error){
         console.log(`${error}`);
         console.log('회원삭제 중 에러가 발생했습니다.');
         return;
      }

      data = response.data;
      let status = response.status;

      if(status === 200){
         console.log('회원삭제 성공');
         alert('회원삭제 성공')

         logout();
      }else{
         console.log('회원삭제 실패');
         alert('회원삭제 실패')
      }
   }

   useEffect(() => {
      getUserInfo();
   },[])

   return (
      <>
         <Header/>
         <div className='container'>
            <UserForm userInfo={userInfo} updateUser={updateUser} deleteUser={deleteUser}/>
         </div>
      </>
   );
};

export default User;