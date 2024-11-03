import React from 'react';
import Header from '../components/Header/Header';
import LoginFormJS from '../components/Login/LoginFormJS';
import * as auth from '../apis/auth'
import { useNavigate } from 'react-router-dom';


const Login = () => {

   /*로그인폼에서 회원가입폼으로 오버레이 된 경우, 
   로그인폼에서 회원가입을 하기 위해 join함수를 만들어준다*/
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
   /*--------------------------------------------*/

   return (
      <>
         <Header/>
         <div className='container'>
            <LoginFormJS join={join}/>
         </div>
      </>
   );
};

export default Login;