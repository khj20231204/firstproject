import React from 'react';
import Table from 'react-bootstrap/Table';
import './BoardForm.css';
import { Link } from 'react-router-dom';
import moment from 'moment';

const BoardForm = (props) => {

   let {subject, key, writer, readcount, reg_date, num} = props

   const date = moment(reg_date).format('MMMM Do YYYY, h:mm:ss');

   console.log("boarForm:"+num);

   return (
      <Table striped="columns" key={key}>
         <tbody>
         <tr>
            <td rowSpan={2} style={{width:100}}>이미지</td>
            <td colSpan={3}><Link to='/detailboard' state={{num:num}} className='btn btn-outline-success' style={{width:'100%'}} variant="success">{subject}</Link></td>
         </tr>
         <tr style={{fontSize:12}}>
            <td width={200}>{writer}</td>
            <td width={300}>{date}</td>
            <td>{readcount}</td>
         </tr>
         </tbody>
      </Table>
   );
};

export default BoardForm;