import React from 'react';
import Header from '../components/Header/Header';
import BoardForm from '../components/Board/BoardForm';


const Board = () => {
   return (
      <>
      <Header/>
      <div className='container'>
         <BoardForm/>
         {/* 1. 로그인 정보가 있으면 글작성버튼 클릭 가능, 없으면 alert창
         2. 비로그인 시 글 보기만 됨
         3. 로그인 시 글 작성, 수정, 삭제  */}
      </div>
   </>
   );
};

export default Board;