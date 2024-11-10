import React, { useContext, useEffect, useState } from 'react';
import { BoardContext } from '../contexts/BoardContextProvider';
import './DetailBoard.css';
import Header from '../components/Header/Header';
import { Link, useLocation } from 'react-router-dom';
import * as boardapi from '../apis/boardapi';
import { LoginContext } from '../contexts/LoginContextProvider';
import moment from 'moment'; 
import * as Swal from '../apis/alert';
import Comment from './Comment';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
import WriteBoard from './WriteBoard';

//DetailBoard에서 현재페이지와 search, keyword를 가져와야 한다.
const DetailBoard = () => {
   let {page, search, keyword} = useContext(BoardContext);
   const { isLogin, roles, userInfo } = useContext(LoginContext) //로그인 정보

   const location = useLocation(); //BoardForm에서 Link to로 같이 넘기 데이터를 받는다.
   const num = location.state.num;

   let [board, setBoard] = useState({});

   let [checkModify , setCheckModify] = useState(false);

   let [writer ,setWriter] = useState(); //글 작성자

   let [userId, setUserId] = useState(); //로그인 사용자

   let [checkModifyForm, setCheckModifyForm] = useState(); //수정 폼으로 변환

   useEffect(() => {

      if(localStorage.getItem('updateUserInfo')) //localStorage에 updateUserInfo 존재성 판단
         setUserId(JSON.parse(localStorage.getItem('updateUserInfo')).userId);

      getDetailBoard(num);
   },[])

   const getDetailBoard = async (num) => {
      
      let response;
      
      try{
         response = await boardapi.detailboard(num);
      }catch(error){
         console.log(error)
      }
      console.log(response.data.detailboard);
      setWriter(response.data.detailboard.userId);
      setBoard({...response.data.detailboard});
   }

   const commentRegister = () => {
      
      if(!isLogin){
         Swal.alert("로그인이 필요합니다.","로그인하세요","warning",() => {});
         return;
      }
   }

   const modifyBoard = () => {

      if(!isLogin){
         Swal.alert("로그인이 필요합니다.","로그인하세요","warning",() => {});
         return;
      }

      //글 작성자 체크 : userInfo에 있는 userId와 response로 받은 userId와 비교
      if(userId !== writer){
         Swal.alert("수정 실패","글 작성자가 아닙니다.","warning",() => {});
         return;
      }   
         
      if(checkModify){
         //수정 취소
         setCheckModify(false); 
         setCheckModifyForm(false);
      }else{
         //글수정
         
         setCheckModify(true);
         setCheckModifyForm(true);
      }
   }

   const modifyBoardComplete = async (e) => {
      e.preventDefault();
      //userId, subject, content
      console.log(e.target)

      const form = e.target;

      const board = {
         userId : userId,
         subject : form.subject.value,
         content : form.content.value
      }
      

      //let reponse = await boardapi.updateBoard()
   }
   return (
      <>
      <Header/>
      <Container>
         <Row style={{height: checkModifyForm ? 500 : 400}}> 
            <Col></Col>
            <Col xs={7} style={{textAlign:'center', height:300, marginTop:50}}>
            <Link to='/board'>게시판으로..</Link>
            <form className="detailboard-container" onSubmit={(e) => {modifyBoardComplete(e)}}>
               <div className="detailboard-header">
                     <div className="detailboard-info">
                        <Row>
                           <Col xs={1}>
                           <div className="profile-icon" style={{margin:10}}><img src={process.env.PUBLIC_URL + 'img/profile_man.png'} width={50}/></div>
                           </Col>
                           <Col xs={5} style={{textAlign:'left', display:'flex', flexDirection:'column', marginTop:10, marginLeft:15}}>
                              <span className="username" name="userId">{board.userId}</span>
                              <span className="timestamp">{moment(board.regDate).format('YYYY-MM-DD, h:mm:ss')}</span>
                           </Col>

                           {checkModify ? 
                           <Col xs={5} style={{textAlign:'right'}}> 
                           <input type='submit' style={{cursor:'pointer'}} value='수정 완료'/>
                           <div onClick={() => {modifyBoard()}} style={{cursor:'pointer'}}><u>취소</u></div>
                           </Col>
                           : 
                           <Col xs={5} style={{textAlign:'right'}}> <div onClick={() => {modifyBoard()}} style={{cursor:'pointer'}}><u>글 수정</u></div></Col>
                           }
                        </Row>
                     </div>
               </div>
              
              <div style={{height: checkModifyForm ? 200 : 100}}>
               {checkModifyForm ? 
                  <>
                  <div className="detailboard-content">제목 : <input type='text' name="subject" defaultValue={board.subject} style={{
                     width: 500,
                     height: 32,
                     fontSize: 15,
                     border: 0,
                     borderRadius: 15,
                     outline: 'none',
                     paddingLeft: 10,
                     backgroundColor:' rgb(233, 233, 233)'
                  }}/></div>
                  <div className="detailboard-detail"><textarea defaultValue={board.content} name="content" rows={6} cols={90} style={{
                    fontSize: 15,
                    border: 0,
                    borderRadius: 15,
                    outline: 'none',
                    paddingLeft: 10,
                    backgroundColor:' rgb(233, 233, 233)'
                  }}></textarea></div>
                  </>
                  : 
                  <>
                  <div className="detailboard-content">{board.subject}</div>
                  <div className="detailboard-detail">{board.content}</div>
                  </>
               }
               </div>
               
               <div className="reply-box">
                  <input type="text" className="reply-input" name="commentText" placeholder="댓글을 입력하세요." />
                  <button className="submit-button" onClick={commentRegister}>등록</button>
               </div>
            </form>
            </Col>
            <Col></Col>
         </Row>
         <Row style={{marginTop:40}}>
            <Col xs={3}></Col>
            <Col xs={8}> <Comment/></Col>
         </Row>
      </Container>
      </>
   );
};

export default DetailBoard;