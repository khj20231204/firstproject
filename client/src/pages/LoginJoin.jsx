import React from 'react';
import Header from '../components/Header/Header';
import LoginJoinForm from '../components/LoginJoin/LoginJoinForm';

const LoginJoin = () => {
   return (
      <>
         <Header/>
         <div className='container'>
            <LoginJoinForm/>
         </div>
      </>
   );
};

export default LoginJoin;