import api from './api'

//원문에 대한 댓글
export const writeoriginalcomm = (comment) => api.post(`/comment/writeoriginalcomm`, comment);

//댓글에 대한 대댓글
export const writesecondecomm = (comment) => api.post(`/comment/writesecondcomm`, comment);

//댓글 불러오기
export const getComment = (re_num) => api.get(`/comment/getComment?re_num=${re_num}`);