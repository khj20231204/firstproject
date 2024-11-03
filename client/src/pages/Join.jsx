import React from 'react';
import Header from '../components/Header/Header';
import JoinFormJS from '../components/Join/JoinFormJS';
import * as auth from '../apis/auth'
import { useNavigate } from 'react-router-dom';

const Join = () => {

   const navigate = useNavigate();

   //회원가입 요청
   const join = async(form) => {
      console.log("pages/Join.jsx");
      console.log(form);

      let response
      let data 
      try{
         response = await auth.join(form);
      }catch(error){
         console.log(`${error}`)
         console.log(`회원가입 요청 중 에러 발생`)
      }

      data = response.data;
      const status = response.status;
      console.log(`data : ${data}`)
      console.log(`status : ${status}`)

      if(status === 200){
         console.log('회원 가입 성공!');
         alert("회원가입 성공!");
         navigate("/");

      }else{
         console.log(`회원 가입 실패`);
         alert("회원가입 실패");
      }
   };

   return (
      <>
         <Header/>
         <div className='container'>
            <JoinFormJS join={join}/>
         </div>
      </>
   );
};

export default Join;