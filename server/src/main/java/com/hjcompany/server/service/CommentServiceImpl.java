package com.hjcompany.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hjcompany.server.mapper.CommentMapper;

@Service
public class CommentServiceImpl implements CommentService {
   
   @Autowired
   private CommentMapper commentMapper;
}
