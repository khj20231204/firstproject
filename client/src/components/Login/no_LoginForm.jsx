import React, { useEffect } from 'react';
// import loginCss from '../Login/LoginForm.module.css';
import '../Login/LoginForm.css'


const LoginForm = () => {

   return (
      <center>
      <div class="login-wrapper">
         <h2>Login</h2>
         <form method="post" action="서버의url" id="login-form">
               <label for="username">UserName</label>
               <input type="text" name="username" placeholder="username"/>
               <label for="password">PassWord</label>
               <input type="password" name="password" placeholder="password"/>
               <label for="remember-check">
                  <input type="checkbox" id="remember-check"/>아이디 저장하기
               </label>
               <input type="submit" value="Login"/>
         </form>
      </div>
    </center>
   );
};

export default LoginForm;