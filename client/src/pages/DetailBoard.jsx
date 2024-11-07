import React from 'react';
import DetailBoardForm from '../components/DetailBoard/DetailBoardForm';
import Header from '../components/Header/Header';

//DetailBoard에서 현재페이지와 search, keyword를 가져와야 한다.
const DetailBoard = () => {
   return (
      <>
      <Header/>
      <div>
         <DetailBoardForm/>
      </div>
      </>
   );
};

export default DetailBoard;