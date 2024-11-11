import React, { useRef, useState } from 'react';
import './CommentForm.css';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import * as commentapi from '../../apis/commentapi';
import * as Swal from '../../apis/alert';

const CommentForm = (props) => { //DetailBoard.jsx에서 받는 props

   const [isVisible , setIsVisible] = useState(false);

   const {re_num, re_lev, re_step, content, user_id, reg_date, refreshPage} = props;

   let commentText = useRef(null);

   const showReply = () => {
      if(isVisible){
         setIsVisible(false)
      }else{
         setIsVisible(true)        
      }
   }

   const deleteReply = async () => {
      
      let comment = {
         re_num : re_num,
         re_lev : re_lev,
         re_step : re_step,
         content : content,
         user_id : user_id
      }

      let response = await commentapi.registerComment(comment);

      alert(response.status);
   }

   //
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
         user_id : user_id
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
            <td colSpan="2" className='content'>{content}</td>
         </tr>
         <tr>
            <td colSpan="2">  
            <Button variant="outline-secondary" style={{width:50,height:26,fontSize:11,margin:5}} onClick={deleteReply}>삭제</Button>
            <Button variant="outline-secondary" style={{width:50,height:26,fontSize:11}} onClick={showReply}>답글</Button>
            </td>
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