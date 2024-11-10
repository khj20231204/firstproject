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
      <table>
         <tr>
            <td>작성자</td>
         </tr>
         <tr>
            <td>내용</td>
         </tr>
         <tr>
            <td>일자</td>
         </tr>
      </table>
      {/* <div style={{margin:30,alignItems:'center'}}>
      <div>
         <div></div>
         <span style={{fontSize:16,fontFamily:'sans-serif'}}>{content}</span>
         <span className="username" style={{fontSize:13}}>{user_id}</span>
         <span> — {date}</span>
         <Button variant="outline-secondary" style={{width:50,height:30,fontSize:11,margin:3}} onClick={deleteReply}>삭제</Button>
         <Button variant="outline-secondary" style={{width:50,height:30,fontSize:11,margin:3}} onClick={showReply}>등록</Button>
      </div>
      <div className="reply-box" style={{display: isVisible ? '' : 'none'}}>
         <input type="text" className="reply-input" placeholder="댓글을 입력하세요." />
      </div>
   </div> */}
   );
};

export default CommentForm;