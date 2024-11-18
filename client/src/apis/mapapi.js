import api from './api'

//api에서 받은 데이터 서버로 넘겨서 DB에 저장
//서버에서 List<Map<String, Object>>로 받는 경로
export const savePharmDatas = (pharmData) => api.post('/pharm/savePharmDatas', pharmData);

//api에서 받은 데이터 서버로 넘겨서 DB에 저장
//서버에서 List<Pharm>으로 받는 경로
export const savePharmDataList = (pharmData) => api.post('/pharm/savePharmDataList', pharmData, {
   headers: {
     'Content-Type': 'application/json', // JSON 형식으로 보냄
   },});

//DB에서 api 데이터 가져오기
export const getData = () => api.post(`/pharm/getData`);