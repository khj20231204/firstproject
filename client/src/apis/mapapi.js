import api from './api'

export const savePharmDatas = (pharmData) => api.post('/pharm/savePharmDatas', pharmData);

export const savePharmDataList = (pharmData) => api.post('/pharm/savePharmDataList', pharmData, {
   headers: {
     'Content-Type': 'application/json', // JSON 형식으로 보냄
   },});
