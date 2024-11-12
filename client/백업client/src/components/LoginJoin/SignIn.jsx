import React, { useContext } from 'react';
import { LoginContext } from '../../contexts/LoginContextProvider'

const SignIn = () => {

   let {login} = useContext(LoginContext);

   const onLogin = (e) => {
      e.preventDefault(); //submit이라서 막는다

      const form = e.target; 
      //현재 form안에 button의 기본속성은 submit이다. 
      //그렇기 때문에 이벤트 속성 e를 통해서 form을 가져올 수 있다
      const username = form.username.value;
      const password = form.password.value;
      //to-do : username와 password의 유효성 검증 추가

      if(username === ''){alert('아이디를 입력하세요'); return}
      if(password === ''){alert('비밀번호를 입력하세요'); return}

      login(username, password);
   }

   return (
      <div className="sign-in-container">
      <form onSubmit={(e)=>(onLogin(e))}>
      {/* <form> */}
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
         <input type="text" name="username" placeholder="username"/>
         <input type="password" name="password" placeholder="password"/>
         <div>
         <input type="checkbox" id="remember-check" style={{width:15}}/> save ID
         </div>
         {/* <button className="form_btn" onClick={() => {onLogin()}}>Sign In</button> */}
         {/* <button className="form_btn" onClick={(e) => onLogin(e)}>Sign In</button> */}
         <button type="submit" className="form_btn">Sign In</button>
      </form>
      </div>
   );
};

export default SignIn;