package com.hjcompany.server.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hjcompany.server.dto.Board;
import com.hjcompany.server.dto.PagingPgm;
import com.hjcompany.server.service.BoardService;

import lombok.extern.slf4j.Slf4j;


@Slf4j
//@CrossOrigin("*")
@RestController
@RequestMapping("/board")
public class BoardController {
   
   @Autowired
   private BoardService boardService;

   @PostMapping("/list")
   public ResponseEntity<Map<String, Object>> list(@RequestParam(value="page", defaultValue="1") int page, @RequestBody Board board) throws Exception {
      System.out.println("page:"+page);
      System.out.println("board:"+board);

      int rowPerPage = 5;

      int total = boardService.getTotalCount(board); //전체 게시물 갯수

      int startRow = (page - 1) * rowPerPage + 1;
      int endRow = startRow + rowPerPage - 1;

      PagingPgm pp = new PagingPgm(total, rowPerPage, page);

		board.setStartRow(startRow);
		board.setEndRow(endRow);

		// List<Board> list = bs.list(startRow, endRow);
		int no = total - startRow + 1;		// 화면 출력 번호

		List<Board> list = boardService.getList(board);

      System.out.println("list:"+list);

      Map<String, Object> map = new HashMap<>();
      map.put("list", list);
      map.put("currentPage", page);
      map.put("no", no);
      map.put("pp",pp);
      
      // 검색
      map.put("search", board.getSearch());
      map.put("keyword", board.getKeyword());
      return new ResponseEntity<>(map, HttpStatus.OK);
   }
}


 
