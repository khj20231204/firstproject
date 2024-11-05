import React from 'react';
import Table from 'react-bootstrap/Table';
import './BoardForm.css';
import { Link } from 'react-router-dom';

const BoardForm = () => {
   return (
      <>
         <div className='board'>
            <Table striped="columns">
               <tbody>
               <tr>
                  <td rowSpan={2} style={{width:100}}>이미지</td>
                  <td colSpan={3}><Link to={"/list/1"} className='btn btn-outline-success' style={{width:'100%'}} variant="success">질문 있어요</Link></td>
               </tr>
               <tr style={{fontSize:12}}>
                  <td>작성자</td>
                  <td>날짜</td>
                  <td>readme</td>
               </tr>
               </tbody>
            </Table>
         </div>
      </>
   );
};

export default BoardForm;