import api from './api'

export const list = (page, board) => api.post(`/board/list?page=${page}`, board);
//export const list = (page) => api.get(`/board/list?page=${page}`);

export const detailboard = (num) => api.get(`/board/detailboard/${num}`)