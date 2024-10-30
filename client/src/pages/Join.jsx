import React from 'react';
import Header from '../components/Header/Header';
import JoinFormJS from '../components/Join/JoinFormJS';

const Join = () => {
   return (
      <>
         <Header/>
         <div className='container'>
            <JoinFormJS/>
         </div>
      </>
   );
};

export default Join;