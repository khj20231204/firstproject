import React from 'react';

const SignUp = ({join}) => {

  const onJoin = (e) => {
      e.preventDefault();

      const form = e.target;

      const userId = form.username.value;
      const userPw = form.password.value;
      const email = form.email.value;

      console.log(`userId=${userId}, userPw=${userPw}, email=${email}`)

      console.log("LoginJoin/SignUp.jsx : join 호출 전");
      join({userId, userPw, email})
      console.log("LoginJoin/SignUp.jsx : join 호출 후");
  }

   return (
      <div className="sign-up-container">
         <form onSubmit={(e)=>onJoin(e)}>
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
            <button type="submit" className="form_btn">Sign Up</button>
         </form>
      </div>
   );
};

export default SignUp;