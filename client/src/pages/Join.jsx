import React from 'react';
import Header from '../components/Header/Header';
import JoinForm from '../components/Join/JoinForm';

const Join = () => {
   return (
      <>
         <Header/>
         <div className='container' style={{marginTop:100}}>
            <JoinForm/>
         </div>
      </>
   );
};

export default Join;