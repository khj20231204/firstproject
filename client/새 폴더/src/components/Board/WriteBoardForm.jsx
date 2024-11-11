"use client";
import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContextProvider';
import * as boardapi from '../../apis/boardapi';
import * as Swal from '../../apis/alert'

const WriteBoardForm = () => {

   let [userId, setUserId] = useState();

   useEffect(() => {   
      const localdata = localStorage.getItem('userInfo');
      setUserId(JSON.parse(localdata).userId);
   }, [userId])

   const naviate = useNavigate();

   //------ 날짜와 시간 구하기 ------
   const currentDate = new Date();

   const year = currentDate.getFullYear();
   const month = currentDate.getMonth() + 1;
   const day = currentDate.getDate();
   const hours = currentDate.getHours();
   const minutes = currentDate.getMinutes();
   const seconds = currentDate.getSeconds();
   
   const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
   //------------------------------

   const writeOn = (e) => {
      e.preventDefault();

      const form = e.target;

      //const 
      const userId = form.userId.value;
      //const reg_date = form.reg_date.value;
      //날짜는 sql쿼리문 default로 입력
      const subject = form.subject.value;
      const content = form.content.value;

      if(subject === ''){
         alert('제목을 입력하세요')
         return;
      }

      if(content === ''){
         alert('내용을 입력하세요');
         return;
      }

      let board = {
         userId : userId,
         /* reg_date : reg_date, 
         날짜는 sql쿼리문 default로 입력*/
         subject : subject,
         content : content
      }

      writeBoard(board);
   }

   const writeBoard = async (board) => {

      //board에 userId가 포함되어 있다
      /* const resposne = await boardapi.writeboard(userId, board, {headers: {
            'Content-Type': 'application/JSON'
         }
      }) */

      let response;
      
      try{
         response = await boardapi.writeboard(board);
      }catch(error){
         console.log(error);
      }
      
      if(response.status === 200){
         Swal.alert("SUCCESS.","글 작성이 성공했어요","success",() => { naviate('/board') });
      }else{
         alert("글 작성 오류 발생");
      }
   }

   const cancle = ()  => {
      naviate(-1);
   }

   return (
      <Container>
      <Row>
        <Col ></Col>
        <Col xs={9}  style={{height:600, marginTop:70}}>
        <Form onSubmit={(e) => {writeOn(e)}}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
               <Form.Label>작성자</Form.Label>
               <Form.Control name="userId" type="text" readOnly style={{backgroundColor:'whitesmoke'}} value={userId}/>
               <Form.Label>작성일자</Form.Label>
               <Form.Control name="reg_date" type="text" readOnly style={{backgroundColor:'whitesmoke'}} value={formattedDate}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
               <Form.Label>제목</Form.Label>
               <Form.Control name="subject" type="text" placeholder="제목을 입력하세요" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
               <Form.Label>내용</Form.Label>
               <Form.Control name="content" as="textarea" rows={3} />
            </Form.Group>
            <div>
               <Button type="submit" variant="success" style={{margin:10}}>글쓰기</Button>
               <Button type="button" variant="secondary" onClick={cancle}>취소</Button>
            </div>
         </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>

   
   );
};

export default WriteBoardForm;

