import React, { useState } from 'react';
import './CommentForm.css';
import Button from 'react-bootstrap/Button';
import moment from 'moment';

const CommentForm = (props) => {

   const [isVisible , setIsVisible] = useState(false);

   const {re_num, re_lev, re_step, content, user_id, reg_date} = props;

   const showReply = () => {
      if(isVisible){
         setIsVisible(false)
      }else{
         setIsVisible(true)        
      }
   }

   const deleteReply = () => {

   }

   const date = moment(reg_date).format('YYYY-HH-DD hh:mm:ss');

   return (
      <center style={{marginLeft:(re_step-1)*70}}>
      <table width={700} border={1}>
         <tr>
            <td>{user_id}</td>
         </tr>
         <tr>
            <td>{content}</td>
         </tr>
         <tr>
            <td>{date}</td>
         </tr>
         <tr>
            <td>
            <Button variant="outline-secondary" style={{width:50,height:30,fontSize:11,margin:3}} onClick={deleteReply}>삭제</Button>
            <Button variant="outline-secondary" style={{width:50,height:30,fontSize:11,margin:3}} onClick={showReply}>등록</Button>
            </td>
         </tr>
      </table>
      <div className="reply-box" style={{display: isVisible ? '' : 'none'}}>
         <input type="text" className="reply-input" placeholder="댓글을 입력하세요." />
      </div>
      </center>
   );
};

export default CommentForm;