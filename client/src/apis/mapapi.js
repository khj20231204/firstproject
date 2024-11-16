import api from './api'

export const savePharmDatas = (pharmData) => api.post('/pharm/savePharmDatas', pharmData);