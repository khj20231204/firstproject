import React, { createContext, useEffect, useState } from 'react';

export const LoginContext = createContext();
LoginContext.displayName = 'LoginContextName'

const LoginContextProvider = ({ children }) => {
   //context value : 로그인 여부, 로그아웃 함수
   const[isLogin, setLogin] = useState();

   const logout = () => {
      setLogin(false);
   }

   const login = () => {
      setLogin(true);
   }
   
  useEffect(() => {
   setTimeout(() => {
      setLogin(true) //3초뒤 setLogin이 true로 
   }, 3000);
  },[])

   return (
      <div>
         <LoginContext.Provider value={{isLogin, logout}}>
            {children}
         </LoginContext.Provider>
      </div>
   );
};

export default LoginContextProvider;