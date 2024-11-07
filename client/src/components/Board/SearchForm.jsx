import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './SearchForm.css';
import { BoardContext } from '../../contexts/BoardContextProvider';

const SearchForm = (props) => {

   const {getList} = props; //Board.jsx에서 받은 getList

   let {page, search, keyword, setPageFunc, setSearchFunc, setKeywordFunc} = useContext(BoardContext);

   const submitSearch = (e) => {
      e.preventDefault();

      const form = e.target;

      const search = form.search.value;
      const keyword = form.keyword.value;

      console.log("search:"+search+ " ,keyword:"+ keyword+" ,page:"+page);
      setSearchFunc(search);
      setKeywordFunc(keyword);

      getList(page);
   }

   return (
      <div className='searchContainer'>
      <form onSubmit={(e) => {submitSearch(e)}}>
         <table>
            <tbody>
            <tr>
               <td>
               <Form.Select aria-label="Default select example" name="search" style={{width:300,margin:3}}>
                  <option></option>
                  <option value="subject">제목</option>
                  <option value="content">내용</option>
                  <option value="writer">작성자</option>
                  <option value="subcon">제목+내용</option>
               </Form.Select>
               </td>
               <td>
               <Form.Control style={{width:300, margin:3}} type="text" id="keyword" name="keyword"/>
               </td>
               <td><Button type="submit" variant="outline-dark">확인</Button></td>
            </tr>
            </tbody>
         </table>
      </form>
      </div>
   );
};

export default SearchForm;