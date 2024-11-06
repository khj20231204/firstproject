import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import BoardForm from '../components/Board/BoardForm';
import axios from 'axios';
import * as auth from '../apis/auth';


const Board = () => {

   const api2 = axios.create();

   const list2 = async() => {

       let response = await auth.list();
      try{
      }catch(error){
         console.log(error);
      }
      console.log("--------------- list async --------------------")
      //console.log(response.data); 
    }

   useEffect(() => {

    /*  fetch('http://localhost:8088/users/list')
      .then((res) => {
         console.log(1, res)
      });
 */
      
      axios.get('http://localhost:8088/users/list')
      .then((result)=>{
         console.log('success')
         console.log(result)
      })
    }, []);

   return (
      <>
      <Header/>
      <div className='container'>
         <BoardForm/>
         {/* 1. 로그인 정보가 있으면 글작성버튼 클릭 가능, 없으면 alert창
         2. 비로그인 시 글 보기만 됨
         3. 로그인 시 글 작성, 수정, 삭제  */}

      </div>
      <button onClick={() => {
         axios.get('https://codingapple1.github.io/shop/data2.json').then((result) => {
            console.log('success')
            console.log(result)
         })
      }}>요청</button>
      <button onClick={list2}>list3</button>
   </>
   );
};

export default Board;