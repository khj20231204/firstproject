import React, { useContext, useEffect, useRef, useState } from 'react';
import { BoardContext } from '../contexts/BoardContextProvider';
import './DetailBoard.css';
import Header from '../components/Header/Header';
import { Link, useLocation } from 'react-router-dom';
import * as boardapi from '../apis/boardapi';
import * as commentapi from '../apis/commentapi';
import { LoginContext } from '../contexts/LoginContextProvider';
import moment from 'moment'; 
import * as Swal from '../apis/alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
import WriteBoard from './WriteBoard';
import CommentForm from './../components/Comment/CommentForm';



//DetailBoard에서 현재페이지와 search, keyword를 가져와야 한다.
const DetailBoard = () => {
   let {page, search, keyword} = useContext(BoardContext);
   const { isLogin, roles, userInfo } = useContext(LoginContext) //로그인 정보

   const location = useLocation(); //BoardForm에서 Link to로 같이 넘길 데이터를 받는다.
   const num = location.state.num;
   //let [num, setNum] = useState(location.state.num);

   let [board, setBoard] = useState({});

   let [checkModify , setCheckModify] = useState(false);

   let [writer ,setWriter] = useState(); //글 작성자

   let [userId, setUserId] = useState(); //로그인 사용자

   let [checkModifyForm, setCheckModifyForm] = useState(); //수정 폼으로 변환

   let [commentList, setCommentList] = useState([]);

   let commentRef = useRef();

   useEffect(() => {

      if(localStorage.getItem('updateUserInfo')) //localStorage에 updateUserInfo 존재성 판단
         setUserId(JSON.parse(localStorage.getItem('updateUserInfo')).userId);

      getDetailBoard(num); //원문 글 가져오기

      showComment(num); //댓글 글 가져오기
   },[])

   //글 불러오기
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

   //원글에 대한 댓글 등록
   const commentRegister = async () => {

      if(!isLogin){
         Swal.alert("로그인이 필요합니다.","로그인하세요","warning",() => {});
         return;
      }

      if(userId === writer){
         Swal.alert("작성 실패","본인 글에는 댓글 작성을 못 합니다.","warning",() => {});
         return;
      }

      const content = commentRef.current.value;

      if(content === ''){
         Swal.alert("작성 실패","댓글을 입력하세요.","warning",() => {});
         return;
      }

      let comment = {
         re_num : num,
         user_id : userId,
         content : content
      }

      //원문에 대한 댓글
      let response = await commentapi.writeoriginalcomm(comment)
      if(response.status === 202){
         //Swal.alert("작성 성공","댓글을 입력했습니다.","success",() => {});
         showComment(num);
      }
   }

   //댓글 목록 가져오기
   const showComment = async (num) => {

      let re_num = num;
      let response = await commentapi.getComment(re_num);

      setCommentList([...response.data.list]);
      console.log("---------------------------------");
      console.log(commentList);
      commentRef.current.value = "";
   }

   //수정 폼 보이게 하기
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
         //글수정 안보이게
         setCheckModify(false); 
         setCheckModifyForm(false);
      }else{
         //글수정 보이게
         setCheckModify(true);
         setCheckModifyForm(true);
      }
   }

   //실제 글수정 작업
   const modifyBoardComplete = async (e) => {
      e.preventDefault();

      const form = e.target;

      const board = {
         num : num,
         //userId : userId, 이미 userId가 일치한 상태로 수정이 가능하기 때문에 필요없다.
         subject : form.subject.value,
         content : form.content.value
      }
      
      let response = await boardapi.updateboard(board);

      if(response.status === 200){
         Swal.alert("SUCCESS.","글이 수정되었습니다.","success",() => {});
      }else{
         alert("글 수정 오류 발생");
      }

      getDetailBoard(num);
      setCheckModify(false); 
      setCheckModifyForm(false);
   }

   //CommentForm에서 댓글입력시 이벤트를 줘서 새로고침을 해야하는데 자식 컴포넌트에 부모 컴포넌트의 함수를 전달하여 부모에서 새로고침하기 위한 함수
   const refreshPage = () => {
      window.location.reload();
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
                  <input type="text" className="reply-input" name="commentText" ref={commentRef} placeholder="댓글을 입력하세요." />
                  <button type="button" className="submit-button" onClick={(e) => {commentRegister(e)}}>등록</button>
               </div>
            </form>
            </Col>
            <Col></Col>
         </Row>
      </Container>
      {commentList.map((v,i) => {
         console.log(v.del);
         return(
         <CommentForm refreshPage={refreshPage} comment_num={v.comment_num} del={v.del} re_num={v.re_num} re_lev={v.re_lev} content={v.content} re_step={v.re_step} user_id={v.user_id} reg_date={v.reg_date} loginId={userId}/>
         )
      })}
      </>
   );
};

export default DetailBoard;