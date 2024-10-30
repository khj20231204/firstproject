import React from 'react';

const SignUp = () => {
   return (
      <div className="sign-up-container">
         <form>
            <h1>Create Account</h1>
            <div className="social-links">
               <div><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></div>
               <div><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></div>
               <div><a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a></div>
            </div>
            <span>or use your email for registration</span>
            <input type="text" name="username" placeholder="username"/>
            <input type="password" name="password" placeholder="password"/>
            <input type="text" name="email" placeholder="email"/>
            <button className="form_btn">Sign Up</button>
         </form>
      </div>
   );
};

export default SignUp;