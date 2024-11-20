import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './pharmacy.css';
import statedata from '../../state.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useEffect, useRef, useState } from 'react';
import statecounty from '../../state_county.json';
import { useNavigate } from 'react-router-dom';
import MapForm from './../Map/MapForm';

const PharMain = () => {

   //useState 초기화 방법 : useState()또는 useState(null) 변수 초기화 / useState([]) 배열 초기화 / useState({}) 객체 초기화
   //if(statName === null) //useState의 빈 변수의 조건은 null로 따진다
   //if(countyList.length === 0) //useState의 빈 배열의 조건은 length로 따진다
   //setCountyList([]); //빈 배열로 해야 map으로 읽어도 문제 발생 안함
	let [stateName, setStateName] = useState(null); //시/도 선택 값
   let [countyList, setCountyList] = useState([]); //시/도에 따른 구/군을 저장하는 list
   let [selectCounty, setSelectCounty] = useState(null); //구/군 선택 값
	let navDropdownRef = useRef(null);
   
   let navigate = useNavigate(null);

   useEffect(() => {
      setSelectCounty(null); //시/도를 선택하면 구/군은 무조건  구/군 선택으로 만든다

      if(stateName !== null)
         setCountyList([...statecounty[stateName]])
   }, [stateName])

   const searchExec = (e) =>{
      e.preventDefault()
      
      let form = e.target;
      /* console.log("pharMain stateName:"+stateName);
      console.log("pharMain countyName:"+selectCounty);
      console.log("pharMain selectCounty:"+ form.searchText.value); */

      navigate('/map', {state:{stateName:stateName,countyName:selectCounty,searchText:form.searchText.value}});
   }

   return (
		<>
		<div className='pharm_outline'>
			<div className='pharm_inline'>
				<div className='pharm_title1'>
					휴일지킴이 약국!
				</div>
				<div className='pharm_title2'>
					여러분의 곁에 있겠습니다.
				</div>
				<div className='pharm_content'>
					<p></p>
					약국명, 도로명 또는 동이름으로 검색할 수 있습니다. ( 예 : 서초동, 효령로, 00약국, 편한약국 )<br/>
					지도에서 검색하고 싶으시면, '지도로 검색'을 클릭해 주세요. (위치 동의를 하지 않으시면 대한약사회를 기준으로 검색됩니다.)<br/>
					행정구역으로 검색을 통해 원하시는 지역을 찾을 수 있습니다.<br/>
				</div>

				<p></p>

				<div className='pharm_search'>
				{/* bootstrap */}
				<Navbar expand="lg" className="bg-body-tertiary" style={{border: '2px solid #dcdcdc'}}>
					<Container>
						<Navbar.Toggle aria-controls="navbarScroll" />
						<Navbar.Collapse id="navbarScroll">
							<Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '80px' }} navbarScroll>
								
								{/* 
                        NavDropdown의 이벤트는 전체를 처리하는 onSelect
                        NavDropdown.Item의 이벤트는 부분을 처리하는 onClick
                        */}
								
								<NavDropdown ref={navDropdownRef} title={stateName === null ? "시/도 선택" : stateName} id="navbarScrollingDropdown" value={stateName} style={{width:400,background:'#ffffff',fontFamily:'sans-serif', margin:5}}>
                           <NavDropdown.Item  onClick={() => {setStateName(null)}}>시/도 선택</NavDropdown.Item>
									{statedata.state.map((v,i) => {
										return (
                               <NavDropdown.Item key={i} value={v} onClick={() => setStateName(v)}>{v}</NavDropdown.Item>
										);
									})}
									
								</NavDropdown>

								<NavDropdown title={selectCounty === null ? "구/군 선택" : selectCounty} id="navbarScrollingDropdown" style={{width:400, background:'#ffffff', margin:5}}>
                        <NavDropdown.Item value="" style={{width:300}} onClick={() => setSelectCounty(null)}>구/군 선택</NavDropdown.Item>
                        {
                           countyList.map((v,i) => {
                             return(<NavDropdown.Item key={i} href="#action3" value={v} style={{width:300}} onClick={() => setSelectCounty(v)}>{v}</NavDropdown.Item>)
                           })
                        }   
								</NavDropdown>	
							</Nav>

							<Form className="d-flex" style={{marginRight:200}} onSubmit={(e) => {searchExec(e)}}>
								<Form.Control type="search" placeholder="Search" className="me-3" aria-label="Search" id="searchText" style={{width:300}}/>
								<Button variant="outline-success" type="submit">Search</Button>
							</Form>
						</Navbar.Collapse>
					</Container>
				</Navbar>
         	{/* bootstrap */}
				</div>
                           
            {/* <LoginContextConsumer></LoginContextConsumer> */}
			</div>
		</div>
    </>
   );
};

export default PharMain;