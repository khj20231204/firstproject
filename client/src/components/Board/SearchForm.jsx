import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './SearchForm.css';

const SearchForm = () => {

   const submitSearch = (e) => {
      e.preventDefault();
   }

   return (
      <div className='searchContainer'>
      <form onSubmit={(e) => {submitSearch(e)}}>
         <table>
            <tbody>
            <tr>
               <td>
               <Form.Select aria-label="Default select example" name="search" style={{width:300,margin:3}}>
                  <option>검색 할 목록</option>
                  <option value="subject">제목</option>
                  <option value="content">내용</option>
                  <option value="writer">작성자</option>
                  <option value="subcon">제목+내용</option>
               </Form.Select>
               </td>
               <td>
               <Form.Control style={{width:300, margin:3}} type="text" id="inputPassword5" />
               </td>
               <td><Button variant="outline-dark">확인</Button></td>
            </tr>
            </tbody>
         </table>
      </form>
      </div>
   );
};

export default SearchForm;