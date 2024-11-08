package com.hjcompany.server.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.hjcompany.server.dto.Board;

@Mapper
public interface BoardMapper {

   int getTotalCount(Board board);

   List<Board> getList(Board board);

   Board getDetailBoard(int num);
}
