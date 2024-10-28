import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './pharmacy.css';
import statedata from '../../state.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useRef, useState } from 'react';

const PharMain = () => {

	let [stateName, setStateName] = useState("시/도 선택");
	let navDropdownRef = useRef(null);

	useEffect(() => {
		console.log(navDropdownRef.current.title)
	},[stateName])

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
				<Navbar expand="lg" className="bg-body-tertiary" style={{border: '2px solid #40a9ff'}}>
					<Container fluid style={{marginLeft:300}}>
						<Navbar.Toggle aria-controls="navbarScroll" />
						<Navbar.Collapse id="navbarScroll">
							<Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
								
								{/* Nav 추가 사용 시
								<Nav.Link href="#action1">주소입력</Nav.Link>
								<Nav.Link href="#action2">Link</Nav.Link> */}
								
								<NavDropdown ref={navDropdownRef} title={stateName} id="navbarScrollingDropdown" style={{width:200}}>
									{statedata.state.map((v,i) => {
										
										return (
										<NavDropdown.Item onClick={(e) => {
											setStateName(v)
										}} style={{width:200}} key={i}>{v}</NavDropdown.Item>
										);
									})}
									
								</NavDropdown>

								<NavDropdown title="구/군 선택" id="navbarScrollingDropdown" style={{width:200}}>
									<NavDropdown.Item href="#action3" style={{width:300}}>Action</NavDropdown.Item>
								</NavDropdown>

							</Nav>

							<Form className="d-flex" style={{marginRight:200}}>
								<Form.Control type="search" placeholder="Search" className="me-3" aria-label="Search" style={{width:300}}/>
								<Button variant="outline-success">Search</Button>
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