import React from 'react';

const OverlayContainer = () => {
   return (
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
   );
};

export default OverlayContainer;