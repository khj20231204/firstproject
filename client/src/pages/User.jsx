import React from 'react';
import Header from '../components/Header/Header';

const User = () => {
   return (
      <>
         <Header/>
         <div className='container'>
            <h1>User</h1>
            <br/>
            <h2>마이 페이지</h2>
            게시판 내용, 좋아요, 댓글
         </div>
      </>
   );
};

export default User;