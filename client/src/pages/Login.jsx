import React from 'react';
import Header from '../components/Header/Header';
import LoginFormJS from '../components/Login/LoginFormJS';

const Login = () => {
   return (
      <>
         <Header/>
         <div className='container'>
            <LoginFormJS/>
         </div>
      </>
   );
};

export default Login;