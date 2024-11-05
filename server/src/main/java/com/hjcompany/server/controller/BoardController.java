package com.hjcompany.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hjcompany.server.service.BoardServiceImpl;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@RestController
@CrossOrigin("*")
@RequestMapping("/board")
public class BoardController {
   
   @Autowired
   private BoardServiceImpl boardServiceImpl;

   //@Secured("") 게시판을 보는 것은 모든 권한
   @GetMapping("/list")
   /* public ResponseEntity<?> list(String pageNum, Board board, Model model) { */
   public ResponseEntity<?> list() {
        System.out.println("board/list");
       return new ResponseEntity<>(null);
   }
   
}
