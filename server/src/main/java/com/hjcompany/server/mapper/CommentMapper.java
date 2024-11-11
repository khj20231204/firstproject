package com.hjcompany.server.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.hjcompany.server.dto.Comment;

@Mapper
public interface CommentMapper {

   int writeOriginalComm(Comment comment);

   List<Comment> getComment(int re_num);

   int registerComm(Comment comment);

   int relevUpdate(Comment comment);

   int deleteComment(Comment comment);

}
