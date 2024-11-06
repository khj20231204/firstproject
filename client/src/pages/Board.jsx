import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import BoardForm from '../components/Board/BoardForm';
import axios from 'axios';
import * as auth from '../apis/auth';
import * as boardapi from '../apis/boardapi';
import SearchForm from '../components/Board/SearchForm';

const Board = () => {

   let [boardList, setBoardList] = useState([]);

   useEffect(() => {

      /*
      fetch('http://localhost:8088/users/list')
         .then((res) => {
            console.log(1, res)
      });*/

      getList();
      
    }, []);


   const getList = async () => {
      
      let response;

      try{
         response = await boardapi.list(2);
      }catch(error){
         console.log(error);
      }
      console.log(response.data);
      //setBoardList([...response.data.list]); //흩뿌리기

   }

   return (
      <>
      <Header/>
      <div className='container'>
            {boardList.map((v, i) => {
              return(  //return 사용하기
               <div>
                  {/* <BoardForm key={i} title={v}/>  */}
               </div>
               )
              })}
         {/* 1. 로그인 정보가 있으면 글작성버튼 클릭 가능, 없으면 alert창
         2. 비로그인 시 글 보기만 됨
         3. 로그인 시 글 작성, 수정, 삭제  */}
      </div>
   </>
   );
};

export default Board;