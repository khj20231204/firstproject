import api from './api'

export const list = (page, board) => api.post(`/board/list?page=${page}`, board);
//export const list = (page) => api.get(`/board/list?page=${page}`);

export const detailboard = (num) => api.get(`/board/detailboard/${num}`);

//board에 userId가 포함되어 있다
//export const writeboard = (userId, board) => api.post(`/board/writeboard`, userId, board)
export const writeboard = (board) => api.post(`/board/writeboard`, board);

export const updateboard = (board) => api.post(`/board/updateboard`, board);
