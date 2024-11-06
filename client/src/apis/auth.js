import api from './api';
//여기서 axios를 호출할 경우 각각의 컴포넌트 마다 새로운 axios 인스턴스가 생성되고 별도의 값들을 가져오게 된다
//api.js를 생성하므로써 전역으로 axios 값을 사용할 수 있다
//jwt토큰을 쿠키에도 저장하지만 axios를 사용하는 모든 컴포넌트들이 사용하는 값으로 저장할 수 있다

//로그인
export const login = (username, password) => api.post(`/login?username=${username}&password=${password}`);
//http://localhost:8088/login?username=user&password=1234 다음과 같은 형식으로 전달

//사용자 정보
export const info = () => api.get(`/users/info`); //그대로

//회원가입
export const join = (data) => api.post(`/users/join`, data)
//export const join = (data) => api.post(`/users`, data

//회원정보 수정
export const update = (data) => api.put(`users/update`, data);
//export const update = (data) => api.put(`users`, data);

//회원탈퇴
//@DeleteMapping("/{userId}")
export const remove = (userId) => api.delete(`/users/${userId}`)

export const list = () => api.get(`/board/list`)