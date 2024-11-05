import React from 'react';
import Header from '../components/Header/Header';
import LoginFormJS from '../components/Login/LoginFormJS';
import * as auth from '../apis/auth'
import { useNavigate } from 'react-router-dom';
import * as Swal from '../apis/alert';


const Login = () => {

   /*로그인폼에서 회원가입폼으로 오버레이 된 경우, 
   로그인폼에서 회원가입을 하기 위해 join함수를 만들어준다*/
   const navigate = useNavigate();

   //회원가입 요청
   const join = async(form) => {
      
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