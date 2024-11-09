package com.hjcompany.server.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hjcompany.server.dto.Board;

@Service
public interface BoardService {

   int getTotalCount(Board board);

   List<Board> getList(Board board);
   
   Board getDetailBoard(int num);

   int writeBoard(Board board);
}
