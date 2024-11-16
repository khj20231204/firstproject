package com.hjcompany.server.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

      int rowPerPage = 5;

      int total = boardService.getTotalCount(board); //전체 게시물 갯수

      /*
      int startRow = (page - 1) * rowPerPage + 1;
      마지막에 1을 더하면 1개인 경우 나타나지 않는다, 0부터 시작
      limit 0,5 => 데이터가 한 개인 경우 출력
      limit 1,5 => 데이터가 한 개인 경우 출력되지 않는다.
      */
      int startRow = (page - 1) * rowPerPage;
      
      //mysql에서 endRow는 필요없다. 변수가 있기 때문에 놔둔다
      int endRow = startRow + rowPerPage - 1; 

      PagingPgm pp = new PagingPgm(total, rowPerPage, page);

		board.setStartRow(startRow);
		board.setEndRow(endRow);

		// List<Board> list = bs.list(startRow, endRow);
		int no = total - (startRow+1) + 1; // 화면 출력 번호

		List<Board> list = boardService.getList(board);

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

   
   @GetMapping("/detailboard/{num}")
   public ResponseEntity<Map<String, Object>> detailBoard(@PathVariable("num") int num) throws  Exception{

      Board board = boardService.getDetailBoard(num);
      //num인 글 조회수 증가
      int result = boardService.setReadCount(num);
      
      Map<String, Object> map = new HashMap<>();

      map.put("detailboard", board);
      return new ResponseEntity<>(map, HttpStatus.OK);
   }

   @PostMapping("/writeboard")
   public ResponseEntity<String> writeBorad(@RequestBody Board board) {
      
      int result = boardService.writeBoard(board);
      
      if(result == 1){
         return new ResponseEntity<>("success", HttpStatus.OK);
      }else{
         return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
      }
   } 
   
   @PostMapping("/updateboard")
   public ResponseEntity<String> updateBoard(@RequestBody Board board) {
      System.out.println("update board:"+board);
      
      int result = boardService.updateBoard(board);

      if(result == 1){
         return new ResponseEntity<>("success", HttpStatus.OK);
      }else{
         return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
      }
   }
   
   @GetMapping("/mapsearch")
   public String requestMethodName() {

      System.out.println("mapsearch");

      return "map";
   }
}


 
