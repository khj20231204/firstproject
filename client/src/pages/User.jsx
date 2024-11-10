import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import UserForm from '../components/User/UserForm';
import * as auth from '../apis/auth';
import { LoginContext } from '../contexts/LoginContextProvider';
import { useNavigate } from 'react-router-dom';
import * as Swal from '../apis/alert';

const User = () => {

   const [userInfo, setUserInfo] = useState();
   const [delAnswer, setDelanswer] = useState(false);

   //비밀번호 수정 시 비밀번호를 수정하고 logout을 호출하기 위해서 useContext에서 logout 함수를 받아온다
   const {logout, loginCheck, isLogin, roles, logoutSetting } = useContext(LoginContext);

   let navigate = useNavigate();

   //새로고침 했을 때 토큰이 있는 경우 403에러를 방지하기 위해사용
   useEffect(() => {
      loginCheck();
   },[]);

   /* 
   이 페이지에 올 때마다 수정된 사용자 정보를 가져와서 UserForm으로 내려준다.
   컴포넌트는 재사용을 할 수도 있기 때문에 page에서 값을 받아서 전달한다
    */

   //회원 정보 조회 - /user/info
   const getUserInfo = async () => {

      //토큰이 없는 경우 바로 주소창에 /user을 쳐서 403에러가 떴을 경우 메인으로 이동
      if(!isLogin || !roles.isUser){
         navigate("/");
         return;
      }

      const response = await auth.info();
      const data = response.data;
      console.log("getUserInfo userInfo : ----------------")
      console.log(data);

      setUserInfo(data);
   }

   //회원 정보 수정
   const updateUser = async (form) => {
      console.log("user.jsx의 updateUser함수")
      console.log(form)

      if(form.userPw ==='' || form.email === ''){
         alert("패스워드와 이메일을 입력하세요")
         return;
      }

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
         Swal.confirm("회원정보 수정 성공","메인페이지로 이동하시겠습니까","success",(result) => {
            if(result.isConfirmed) navigate("/");
         })

         //비밀번호 수정이면 logout처리
         //logout();
      }else{
         console.log('회원정보 수정 실패');
         Swal.alert("회원정보 수정 실패","회원정보 수정에 실패했습니다","error");
      }
   }

   //회원 탈퇴를 위해 필요한 부분
   let [userId, setUserId] = useState(); 
   /*
   새로고침하면 state에 있는 userInfo의 정보가 없어지기 때문에 userInfo에 userId가 있어서 에러 발생
   앞쪽 자식 컴포넌트에서 값을 넘겨받아야 한다. 
   */

   const deleteUser2 = async (userId, userPw) =>{ //자식 컴포넌트에서 userId를 넘겨받았다

      if(userPw === '') {
         Swal.alert("","로그인에 사용된 비밀번호를 입력하세요","error");
         return;
      }

      try{

         let response = await auth.login(userId, userPw);
         const status = response.status;
         
         setUserId(userId); //넘겨받은 userId를 state에 저장
         Swal.confirm("계정 삭제","계정을 삭제하시겠습니까?","success",(result) => {
            if(result.isConfirmed) { 
               setDelanswer(true); 
               //Swal의 값이 true로 변화가 있을 때마다 Delanser을 변경시켜서 useEffect가 실행되도록 했다
            }
         });

      }catch(error){
         Swal.alert("","비밀번호가 일치하지 않습니다.","error");
      }
      
      /*
      setUserId(userId); //넘겨받은 userId를 state에 저장
      Swal.confirm("계정 삭제","계정을 삭제하시겠습니까?","success",(result) => {
         if(result.isConfirmed) { 
            setDelanswer(true); 
            //Swal의 값이 true로 변화가 있을 때마다 Delanser을 변경시켜서 useEffect가 실행되도록 했다
         }
      }); */
   }

   useEffect(() => {
      deleteUser();
   }, [delAnswer]) //Swal에서 확인을 누르면 deleteUser가 실행

   //회원 탈퇴
   const deleteUser = async () => {
    
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
         logoutSetting();
         Swal.alert("회원정보 삭제 성공","회원정보 삭제에 성공했습니다.","success",()=>{navigate("/")});
      }else{
         console.log('회원삭제 실패');
         Swal.alert("회원정보 삭제 실패","회원정보 삭제에 실패했습니다.","error");
      } 
      
   }

   useEffect(() => {
      getUserInfo();
   },[])

   return (
      <>
         <Header/>
         <div className='container'>
            <UserForm userInfo={userInfo} updateUser={updateUser} deleteUser2={deleteUser2}/>
         </div>
      </>
   );
};

export default User;