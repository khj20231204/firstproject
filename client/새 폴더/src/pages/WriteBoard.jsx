import React, { useContext, useEffect, useState } from 'react';
import WriteBoardForm from '../components/Board/WriteBoardForm';
import Header from '../components/Header/Header';
import { LoginContext } from '../contexts/LoginContextProvider';

const WriteBoard = () => {

   return (
      <>
      <Header/>
      <div>
         <WriteBoardForm/>
      </div>
      </>
   );
};

export default WriteBoard;