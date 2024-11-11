import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Header.css'
import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../contexts/LoginContextProvider';
import { useNavigate } from 'react-router-dom';


const Header = () => {

   //isLogin : 로그인 여부 - Y(true), N(false)
   //logout() : 로그아웃 함수 - setLogin(false)
   const { isLogin, login, logout, userInfo } = useContext(LoginContext);

   let [userId, setUserId] = useState();

   useEffect(() => {
      //로그인하면 userInfo에 값이 들어가고 userInfo가 null아니면 상단에 userId표시
      if(userInfo) {
         setUserId(userInfo.userId);
      }
   },[userInfo])

   const navigate = useNavigate();

   return (
      <header>
         <Navbar expand="lg" className="bg-body-tertiary">
         <Container>
            <div>
            <Navbar.Brand onClick={() => {navigate("/")}} style={{cursor:'pointer'}}>HJ'Home</Navbar.Brand>
            </div>

            <div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="me-auto">
                  
                  {
                     isLogin ? 
                     <>
                     <u style={{margin:10}}>{userId}</u>
                     <Nav.Link onClick={() => {navigate("/user")}} style={{padding:10}}>마이페이지</Nav.Link>
                     <Nav.Link onClick={() => { logout() }} style={{padding:10}}>로그아웃</Nav.Link>
                     <Nav.Link onClick={() => {navigate("/admin")}} style={{padding:10}}>관리자</Nav.Link>
                     </> 
                     :
                     <>
                     <Nav.Link onClick={() => {navigate("/login")}} style={{padding:10}}>로그인</Nav.Link>
                     <Nav.Link onClick={() => {navigate("/join")}} style={{padding:10}}>회원가입</Nav.Link>
                     <Nav.Link onClick={() => {navigate("/admin")}} style={{padding:10}}>관리자</Nav.Link>
                     {/* <Nav.Link onClick={() => { navigate("/loginjoin") }} style={{padding:10}}>로그인</Nav.Link> */}
                     </>
                  }

                  <Nav.Link onClick={() => {navigate("/earth_search")}} style={{padding:10}}>지도로 검색</Nav.Link>
                  <Nav.Link onClick={() => {navigate("/state_search")}} style={{padding:10}}>행정구역으로 검색</Nav.Link>
                  <Nav.Link onClick={() => {navigate("/board")}} style={{padding:10}}>게시판</Nav.Link>

                  <NavDropdown title="API메뉴" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">약국찾기</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">일기 예보</NavDropdown.Item>
                  </NavDropdown>
               </Nav>
            </Navbar.Collapse>
            </div>
            </Container>
           
         </Navbar>
            
    </header>
   );
};

export default Header;