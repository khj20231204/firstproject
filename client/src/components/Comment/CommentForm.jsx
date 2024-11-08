import React, { useState } from 'react';
import './CommentForm.css';
import Button from 'react-bootstrap/Button';

const CommentForm = () => {

   const [isVisible , setIsVisible] = useState(false);

   const showReply = () => {
      if(isVisible){
         setIsVisible(false)
      }else{
         setIsVisible(true)        
      }
   }

   return (
      <div className="comment">
      <div className="comment-container">
         <div className="profile-icon"></div>
         <span className="comment-content">안녕하세요</span>
         <span className="username">HJ</span>
         <span className="timestamp"> — 2024.11.08 16:52</span>
         <a href="#" className="delete-link">삭제</a>
         <Button variant="outline-secondary" onClick={showReply}>댓글 등록</Button>
      </div>
      <div className="reply-box" style={{display: isVisible ? '' : 'none'}}>
         <input type="text" className="reply-input" placeholder="댓글을 입력하세요." />
      </div>
   </div>
   );
};

export default CommentForm;