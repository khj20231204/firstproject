import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import Table from 'react-bootstrap/Table';
import BoardForm from '../components/Board/BoardForm';
import * as boardapi from '../apis/boardapi';
import SearchForm from '../components/Board/SearchForm';
import Button from 'react-bootstrap/Button';
import Pagenation from '../components/Board/Pagenation';
import { BoardContext } from '../contexts/BoardContextProvider';
import { LoginContext } from '../contexts/LoginContextProvider';
import * as Swal from '../apis/alert';
import {useNavigate} from 'react-router-dom';

const Board = () => {

   //보드에 보여줄 list
   let [boardList, setBoardList] = useState([]);

   //전체 페이지
   let [totalPage, setTotalPage] = useState();

   //board의 pk num값
   let [num, setNum] = useState();

   //글 번호
   let [no, setNo] = useState();

   //page, search, keyword는 항상 들고 다녀야하기 때문에 context로 선언
   let {page, search, keyword, setPageFunc, setSearchFunc, setKeywordFunc} = useContext(BoardContext);

   //로그인 정보
   const { isLogin } = useContext(LoginContext)

   const navigate = useNavigate();

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
      //context의 page, keywoar, search사용
      setPageFunc(response.data.currentPage);
      //setKeywordFunc(keyword);
      //setSearchFunc(search)

      setNo(response.data.no);
      setTotalPage(response.data.pp.totalPage)
      setBoardList([...response.data.list]); //흩뿌리기

      //새로고침시 정보 삭제 방지
      localStorage.setItem("page", response.data.currentPage);
      localStorage.setItem("no", response.data.no);
      localStorage.setItem("totalPage", response.data.pp.totalPage);
   }

   const write = () => {
      if(!isLogin){
         Swal.alert("로그인이 필요합니다.","로그인하세요","warning",() => {});
         return;
      }

      navigate("/WriteBoard")
   }

   return (
      <>
      <Header/>
      <div className='container'>
         <div style={{display:'flex',justifyContent:'space-between',margin:50}}>
            <SearchForm />
            <Button variant="outline-primary" onClick={write} style={{height:40,width:100}}>글쓰기</Button>
         </div>
         <div>
            <Table striped="columns">
            <thead>
               <tr align='center'>
                  <th>글 번호</th>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>작성일</th>
                  <th>조회수</th>
               </tr>
            </thead>
            <tbody>
            {boardList.map((v, i) => {
               return(  //return 사용하기
                  <BoardForm subject={v.subject} userId={v.userId} readcount={v.readcount} regDate={v.regDate} num={v.num} /> 
                  )
               })}
            </tbody>
            </Table>
            <div style={{display:'flex'}}>
               <Pagenation style={{margin:'auto 0'}} getList={getList} totalPage={totalPage} page={page}/>
            </div>
         </div>
      </div>
   </>
   );
};

export default Board;
