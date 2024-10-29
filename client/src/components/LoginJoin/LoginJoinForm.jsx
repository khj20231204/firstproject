import React, { useEffect } from 'react';
import './LoginJoinForm.css';

const LoginJoinForm = () => {

   useEffect(() => {
      const signUpBtn = document.getElementById("signUp");
      const signInBtn = document.getElementById("signIn");
      const container = document.querySelector(".loginformjs .container");
         
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
   <div className="loginformjs">
      <div className="wrapper ">
         <div className="container">
            <div className="sign-up-container">
            <form>
               <h1>Create Account</h1>

               {/* 실제 값을 넘겨주는 버튼이 있는 Sign Up */}
               <div className="social-links">
                  <div><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></div>
                  <div><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></div>
                  <div><a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a></div>
               </div>
               <span>or use your email for registration</span>
               <input type="text" placeholder="Name"/>
               <input type="email" placeholder="Email"/>
               <input type="password" placeholder="Password"/>
               <button className="form_btn">Sign Up</button>
            </form>
            </div>

             {/* 실제 값을 넘겨주는 버튼이 있는 Sign In */}
            <div className="sign-in-container">
            <form>
               <h1>Sign In</h1>
               <div className="social-links">
                  <div>
                     <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                  </div>
                  <div>
                     <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                  </div>
                  <div>
                     <a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
                  </div>
               </div>
               <span>or use your account</span>
               <input type="email" placeholder="Email"/>
               <input type="password" placeholder="Password"/>
               <button className="form_btn">Sign In</button>
            </form>
            </div>

            {/* 빨간 부분의 오버레이 부분으로 단순 js 실행 */}
            <div className="overlay-container">
               <div className="overlay-left">
               <h1>Welcome Back</h1>
               <p>To keep connected with us please login with your personal info</p>
               <button id="signIn" className="overlay_btn">Sign In</button>
               </div>
               <div className="overlay-right">
               <h1>Hello, Friend</h1>
               <p>Enter your personal details and start journey with us</p>
               <button id="signUp" className="overlay_btn">Sign Up</button>
               </div>
            </div>

         </div>
      </div>
      </div>
   );
};

export default LoginJoinForm;