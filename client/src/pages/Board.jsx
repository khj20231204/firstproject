import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import BoardForm from '../components/Board/BoardForm';
import * as boardapi from '../apis/boardapi';
import SearchForm from '../components/Board/SearchForm';
import Button from 'react-bootstrap/Button';
import Pagenation from '../components/Board/Pagenation';
import { BoardContext } from '../contexts/BoardContextProvider';

const Board = () => {

   //보드에 보여줄 list
   let [boardList, setBoardList] = useState([]);

   //전체 페이지
   let [totalPage, setTotalPage] = useState();

   //board의 pk num값
   let [num, setNum] = useState();

   //page, search, keyword는 항상 들고 다녀야하기 때문에 context로 선언
   let {page, search, keyword, setPageFunc, setSearchFunc, setKeywordFunc} = useContext(BoardContext);

   useEffect(() => {
      /*
      axios.get('http://localhost:8088/board/list')
         .then(response => {
           console.log(response.data);
         })
         .catch(error => {
           console.error(error);
         });

      fetch('http://localhost:8088/board/list')
         .then((res) => {
            console.log(1, res)
      });*/

      getList(page);
      
    }, [page, search, keyword]); //SearchForm에서 search와 keyword값만 변경하면 의존성배열에서 탐지


   const getList = async (page) => {

      //공백으로 처리하면 서버쪽에서 오류남
      if(search === '') search = null;
      if(keyword === '') keyword = null;
      
      const board = {
         search : search,
         keyword : keyword,
      }; 
 
      let response;

      try{
         response = await boardapi.list(page, board);
         //response = await boardapi.list(page);
      }catch(error){
         console.log(error);
      }

      //context의 page사용
      setPageFunc(response.data.currentPage);

      setTotalPage(response.data.pp.totalPage)
      setBoardList([...response.data.list]); //흩뿌리기
   }

   return (
      <>
      <Header/>
      <div className='container'>
         <div style={{display:'flex',justifyContent:'space-between',margin:50}}>
            <SearchForm />
            <Button variant="outline-primary">글쓰기</Button>
         </div>
         <div>
            <div>
               {boardList.map((v, i) => {
               return(  //return 사용하기
                  <div key={i}>
                     <BoardForm subject={v.subject} writer={v.writer} readcount={v.readcount} reg_date={v.reg_date} num={v.num}/> 
                  </div>
                  )
               })}
            </div>
            <div style={{display:'flex'}}>
               <Pagenation style={{margin:'auto 0'}} getList={getList} totalPage={totalPage}/>
            </div>
         </div>
      </div>
   </>
   );
};

export default Board;
{/* 1. 로그인 정보가 있으면 글작성버튼 클릭 가능, 없으면 alert창
2. 비로그인 시 글 보기만 됨
3. 로그인 시 글 작성, 수정, 삭제  */}