import React from 'react';
import Header from '../components/Header/Header';
import JoinFormJS from '../components/Join/JoinFormJS';
import * as auth from '../apis/auth'
import { useNavigate } from 'react-router-dom';
import * as Swal from '../apis/alert'

const Join = () => {

   const navigate = useNavigate();

   //회원가입 요청
   const join = async(form) => {

      console.log("pages/Join.jsx");
      console.log(form);

      try{
         let response = await auth.join(form);

         let data = response.data;
         const status = response.status;
         console.log(`data : ${data}`)
         console.log(`status : ${status}`)

         if(status === 200){
            console.log('회원 가입 성공!');
            Swal.alert("회원가입 성공","메인 화면으로 이동합니다.", "success", () => { navigate("/") });
         }else{
            console.log(`회원 가입 실패`);
            Swal.alert("회원가입 실패","회원가입에 실패하였습니다.","error");
         }
      }catch(error){
         console.log(`${error}`)
         console.log(`회원가입 요청 중 에러 발생`)
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