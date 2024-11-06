import React from 'react';
import Table from 'react-bootstrap/Table';
import './BoardForm.css';
import { Link } from 'react-router-dom';

const BoardForm = (props) => {

   let {title, key} = props

   return (
      <Table striped="columns">
         <tbody>
         <tr>
            <td rowSpan={2} style={{width:100}}>이미지</td>
            <td colSpan={3}><Link to={"/list/1"} className='btn btn-outline-success' style={{width:'100%'}} variant="success">{title}</Link></td>
         </tr>
         <tr style={{fontSize:12}}>
            <td>작성자</td>
            <td>날짜</td>
            <td>readme</td>
         </tr>
         </tbody>
      </Table>
   );
};

export default BoardForm;