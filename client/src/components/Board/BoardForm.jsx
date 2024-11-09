import React from 'react';
import Table from 'react-bootstrap/Table';
import './BoardForm.css';
import { Link } from 'react-router-dom';
import moment from 'moment';

const BoardForm = (props) => {

   let {subject, key, userId, readcount, regDate, num} = props

   const date = moment(regDate).format('YYYY-MM-DD, h:mm:ss');

   console.log("boarForm:"+num);

   return (
      <tr align='center'>
         <td style={{width:100}}>{num}</td>
         <td style={{width:400}}>{subject}</td>
         <td style={{width:200}}>{userId}</td>
         <td style={{width:300}}>{date}</td>
         <td style={{width:100}}>{readcount}</td>
      </tr>
   );
};

export default BoardForm;