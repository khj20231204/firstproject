import React, { useRef } from 'react';
import './UserForm.css';

const UserForm = ({userInfo, updateUser, deleteUser2}) => { //User.jsx에서 넘겨준 props

   const usernameInput = useRef();
   const passwordInput = useRef();

   const onUpdate = (e) => {
      e.preventDefault(); //submit이라서 막는다

      const form = e.target; 
      //현재 form안에 button의 기본속성은 submit이다. 
      //그렇기 때문에 이벤트 속성 e를 통해서 form을 가져올 수 있다
      const userId = form.username.value;
      const userPw = form.password.value;
      const email = form.email.value;

      updateUser({userId, userPw, email})
   }

   const onDelete = () => {
      console.log(usernameInput.current.value + " , " + passwordInput.current.value);
      deleteUser2(usernameInput.current.value, passwordInput.current.value);
   }

   return (
      <div className="userform">
      <div className="wrapper">
         <div className="container right-panel-active">
         <div className="sign-up-container">
         <form onSubmit={(e)=> onUpdate(e)}>
            <h1>My Account</h1>
            <div className="social-links">
               <div><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></div>
               <div><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></div>
               <div><a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a></div>
            </div>
            <span>update your personal information</span>
            <input type="text" ref={usernameInput} name="username" placeholder="username" readOnly defaultValue={userInfo?.userId}/>
            <input type="password" ref={passwordInput} name="password" placeholder="변경할 password"/>
            <input type="text" name="email" placeholder="변경할 email" defaultValue={userInfo?.email}/>
            <button type="submit" className="form_btn">Update Now</button>
            <button type="button" onClick={() => onDelete()}>Delete Account</button>
         </form>
      </div>
         </div>
      </div>
   </div>
      );
   };

export default UserForm;