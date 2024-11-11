package com.hjcompany.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hjcompany.server.dto.Comment;
import com.hjcompany.server.mapper.CommentMapper;

@Service
public class CommentServiceImpl implements CommentService {
   
   @Autowired
   private CommentMapper commentMapper;

   @Override
   public int writeOriginalComm(Comment comment) {
      return commentMapper.writeOriginalComm(comment);
   }

   @Override
   public List<Comment> getComment(int re_num) {
      return commentMapper.getComment(re_num);
   }

   @Override
   public int registerComm(Comment comment) {
      return commentMapper.registerComm(comment);
   }

   @Override
   public int relevUpdate(Comment comment) {
      return commentMapper.relevUpdate(comment);
   }

 

}
