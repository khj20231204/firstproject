import React from 'react';

const JoinForm = () => {
   return (
      <center>
      <div class="login-wrapper">
         <h2>Join</h2>
         <form method="post" action="서버의url" id="login-form">
               
               <label for="username">UserName</label>
               <input type="text" name="username" placeholder="username"/>
               <label for="password">PassWord</label>
               <input type="password" name="password" placeholder="password"/>
               <label for="name">Name</label>
               <input type="text" name="name" placeholder="name"/>
               <label for="email">Email</label>
               <input type="text" name="email" placeholder="email"/>

               <input type="submit" value="Login"/>
         </form>
      </div>
    </center>
   );
};

export default JoinForm;