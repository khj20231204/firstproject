package com.hjcompany.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hjcompany.server.dto.Board;
import com.hjcompany.server.mapper.BoardMapper;

@Service
public class BoardServiceImpl implements BoardService {

   @Autowired
   private BoardMapper boardMapper;

   @Override
   public int getTotalCount(Board board) {
     return boardMapper.getTotalCount(board);
   }

   @Override
   public List<Board> getList(Board board) {
      return boardMapper.getList(board);
   }

}
