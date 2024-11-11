import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './SearchForm.css';
import { BoardContext } from '../../contexts/BoardContextProvider';

const SearchForm = () => {

   let {setSearchFunc,setKeywordFunc} = useContext(BoardContext);

   const submitSearch = (e) => {
      e.preventDefault();

      const form = e.target;

      const search = form.search.value;
      const keyword = form.keyword.value;

      setSearchFunc(search);
      setKeywordFunc(keyword);
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
                  <option value="user_id">작성자</option>
                  {/* user_id는 db 컬럼을 가리킨다 */}
                  <option value="subcon">제목+내용</option>
               </Form.Select>
               </td>
               <td>
               <Form.Control style={{width:300, margin:3}} type="text" placeholder='검색할 내용을 입력하세요' id="keyword" name="keyword"/>
               </td>
               <td><Button type="submit" variant="outline-dark" style={{width:100}}>확인</Button></td>
            </tr>
            </tbody>
         </table>
      </form>
      </div>
   );
};

export default SearchForm;