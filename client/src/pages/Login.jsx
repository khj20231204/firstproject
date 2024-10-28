import React from 'react';
import Header from '../components/Header/Header';
import LoginForm from '../components/Login/LoginForm';
import LoginFormJs from './../components/Login/LoginFormJs';

const Login = () => {
   return (
      <>
         <Header/>
         <div className='container'>
         {/* <LoginForm/> */}
         <LoginFormJs/>
         </div>
      </>
   );
};

export default Login;