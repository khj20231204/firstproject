import api from './api'

export const list = (page) => api.get(`/board/list?page=${page}`);