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

         if(status === 200){
            //아이디 중복이라도 status200으로 보내야 post 자바스크립트 error가 안난다
            if(data === "IDCHECK"){ 
               console.log(`아이디가 존재 합니다`);
               Swal.alert("회원가입 실패","아이디가 존재 합니다.","error");
            }else{
               console.log('회원 가입 성공!');
               Swal.alert("회원가입 성공","메인 화면으로 이동합니다.", "success", () => { navigate("/") });
            }
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