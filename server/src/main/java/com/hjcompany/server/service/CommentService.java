package com.hjcompany.server.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hjcompany.server.dto.Comment;

@Service
public interface CommentService {

   int writeOriginalComm(Comment comment);

   List<Comment> getComment(int re_num);

   int registerComm(Comment comment);

   int relevUpdate(Comment comment);

   int deleteComment(Comment comment);



}
