import React, { useEffect } from 'react';
import './JoinFormJS.css';
import SignUp from '../LoginJoin/SignUp';
import SignIn from '../LoginJoin/SignIn';
import OverlayContainer from '../LoginJoin/OverlayContainer';

const JoinFormJs = () => {

   useEffect(() => {
      const signUpBtn = document.getElementById("signUp");
      const signInBtn = document.getElementById("signIn");
      const container = document.querySelector(".joinformjs .container");
         
      signUpBtn.addEventListener("click", () => {
         container.classList.add("right-panel-active");
         
      });
      
      signInBtn.addEventListener("click", () => {
         container.classList.remove("right-panel-active");
      });
         
      return () => { //메모리 누수를 방지
         document.removeEventListener("click", () => {
            container.classList.add("right-panel-active");
         })
      }
   },[]);

   return (
   <div className="joinformjs">
      <div className="wrapper">
         <div className="container right-panel-active">
            <SignUp/>
            <SignIn/>
            <OverlayContainer/>
         </div>
      </div>
   </div>
   );
};

export default JoinFormJs;