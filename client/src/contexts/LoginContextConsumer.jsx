import React, { useContext } from 'react';
import { LoginContext } from './LoginContextProvider';

const LoginContextConsumer = () => {

   const { isLogin,tokenMsg,userInfo } = useContext(LoginContext);

   return (
      <div>
         <h2>LoginContextConsumer</h2>
         {
            isLogin ? 
            <>
            <div>JWT : {tokenMsg}</div>
            <div>Payload : {JSON.stringify(userInfo)}</div>
            </>
            :
            <div>Logout</div>
         }
          
      </div>
   );
};

export default LoginContextConsumer;

