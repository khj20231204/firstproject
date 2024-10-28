import axios from "axios";

//create메소드로 axios 객체 생성 : 전역으로 사용
//axios를 사용할 경우 이 컴포넌트를 import해서 사용
const api = axios.create();

export default api;