package com.hjcompany.server.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hjcompany.server.dto.Comment;
import com.hjcompany.server.service.CommentService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/comment")
public class CommentController {
   
   @Autowired
   private CommentService commentService;

   //원글에 대한 댓글 입력(첫번째 댓글이 된다)
   @PostMapping("/writeoriginalcomm")
   public ResponseEntity<String> writeOriginalComm(@RequestBody Comment comment) {
      
      int result = commentService.writeOriginalComm(comment);

      return new ResponseEntity<>("success",HttpStatus.ACCEPTED);
   }
   
   //댓글을 가져온다
   @GetMapping("/getComment")
   public ResponseEntity<Map<String, Object>> getComment(@RequestParam("re_num") int re_num) {

      List<Comment> list = commentService.getComment(re_num);

      Map<String, Object> map = new HashMap<>();
      map.put("list",list);

       return new ResponseEntity<>(map, HttpStatus.OK);
   }

   //댓글에 대한 댓글 입력
   @PostMapping("/registercomm")
   public ResponseEntity<String> registerComm(@RequestBody Comment comment) {

      System.out.println("comment:"+comment);
      
      //자신이 들어갈 re_lev보다 큰 re_lev 전부 1씩 증가
      int result = commentService.relevUpdate(comment);

      System.out.println("relevUpdate result:"+result);

      //자신이 입력된다
      result = commentService.registerComm(comment);

      System.out.println("registerComm result:"+result);
      
      return new ResponseEntity<>("ok", HttpStatus.OK);
   }
   
   @PostMapping("/deleteComment")
   public ResponseEntity<String> deleteComment(@RequestBody Comment comment) {

      System.out.println("comment:"+comment);
      
      //삭제 시 del값을 'Y'로 변경
      int result = commentService.deleteComment(comment);

      System.out.println("relevUpdate result:"+result);
      
      return new ResponseEntity<>("ok", HttpStatus.OK);
   }
}
