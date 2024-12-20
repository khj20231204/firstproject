import React, { useRef, useState } from 'react';
import './CommentForm.css';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import * as commentapi from '../../apis/commentapi';
import * as Swal from '../../apis/alert';

const CommentForm = (props) => { //DetailBoard.jsx에서 받는 props

   const [isVisible , setIsVisible] = useState(false);

   const {comment_num, re_num, re_lev, re_step, content, loginId, user_id, reg_date, refreshPage, del} = props;
   /* lgoinId는 현재 로그인한 아이디, user_id는 댓글 작성자 아이디, 삭제할 때 확인 체크를 위해 필요 */

   let commentText = useRef(null);

   const showReply = () => {
      if(isVisible){
         setIsVisible(false)
      }else{
         setIsVisible(true)        
      }
   }

   //대댓글 삭제
   const deleteReply = async () => {
      
      if(loginId !== user_id){
         Swal.alert("삭제 실패","글 작성자가 아닙니다.","warning",() => {});
         return;
      }

      let result = window.confirm("댓글을 삭제하시겠습니까?");

      if(!result) return;

      let comment = {
         comment_num : comment_num,
         re_num : re_num,
         re_lev : re_lev,
         re_step : re_step,
         content : content,
         user_id : user_id 
      }

      let response = await commentapi.deleteComment(comment);

      if(response.status === 200)
         refreshPage();
   }

   //대댓글 등록
   const registerComment = async () => {
      let content = commentText.current.value;

      if(content === ''){
         Swal.alert("작성 실패","답글을 입력하세요.","warning",() => {});
         return;
      }

      let comment = {
         re_num : re_num,
         re_lev : re_lev,
         re_step : re_step,
         content : content,
         user_id : loginId //loginId가 입력해야 로그인 한 아이디가 된다. user_id는 작성자의 아이디
      }
      
      let response = await commentapi.registerComment(comment);

      if(response.status === 200){
         commentText.current.value = "";
         setIsVisible(false);

         refreshPage();
      }
   }

   const date = moment(reg_date).format('YYYY-HH-DD hh:mm:ss');

   return (
      <>
      <center style={{marginLeft:(re_step-1)*70}}>
      <table >
         <tr>
            {re_step === 1 ? 
            <td className='writer'>{user_id} </td>
            : 
            <td className='writer'>ㄴ{user_id} </td>
            }
            
            <td className='date'>{date}</td>
         </tr>
         <tr>
            {del === 'Y' ? 
            <td><span style={{color:'red', fontSize:14, backgroundColor:'lightgray'}}>삭제된 답글입니다.</span> </td>
            : 
            <td colSpan="2" className='content'>{content}</td>
            }
            
         </tr>
         <tr>
            {del === 'Y' ?  
               <td></td>
            :
               <td colSpan="2">  
               <Button variant="outline-secondary" style={{width:50,height:26,fontSize:11,margin:5}} onClick={deleteReply}>삭제</Button>
               <Button variant="outline-secondary" style={{width:50,height:26,fontSize:11}} onClick={showReply}>답글</Button>
               </td>
            }
         </tr>
      </table>
      <table style={{display: isVisible ? '' : 'none'}}>
         <tr>
            <td><input type="text" className="replyText" ref={commentText} placeholder="답글을 입력하세요."/></td>
            <td style={{textAlign:'left'}}><button type="button" className="replyButton" onClick={() => {registerComment()}}>등록</button></td>
         </tr>
      </table>
      </center>
   </>
   );
};

export default CommentForm;