import React, { useContext, useEffect } from 'react';
import Header from '../components/Header/Header';
import LoginContextProvider from '../contexts/LoginContextProvider';
import { useNavigate } from 'react-router-dom';

const Admin = () => {

   const { isLogin, roles } = useContext(LoginContextProvider)
   const navigate = useNavigate();

   //관리자 권한이 있는 사람만 로그인, 아니면 메인으로 이동
   useEffect(() => {
      if(!isLogin){
         alert(`로그인이 필요합니다.`);
         navigate('/login');
         return;
      }

      if(!roles.isAdmin){
         alert(`권한이 없습니다.`);
         navigate(-1);
         return;
      }

   }, [])

   return (
      <>
      {
         isLogin && roles &&
         <>
         <Header/>
         <div className='container'>
            <h1>Admin</h1>
            <br/>
            <h2>관리자 페이지</h2>
         </div>
         </>
      }
      </>
   );
};

export default Admin;