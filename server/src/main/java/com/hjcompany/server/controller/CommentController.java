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

   @PostMapping("/writeoriginalcomm")
   public ResponseEntity<String> writeOriginalComm(@RequestBody Comment comment) {
      
      System.out.println("comment:"+comment);
      int result = commentService.writeOriginalComm(comment);

      return new ResponseEntity<>("success",HttpStatus.ACCEPTED);
   }
   
   @GetMapping("/getComment")
   public ResponseEntity<Map<String, Object>> getComment(@RequestParam("re_num") int re_num) {

      List<Comment> list = commentService.getComment(re_num);

      System.out.println("getComment list:"+list);

      Map<String, Object> map = new HashMap<>();
      map.put("list",list);

       return new ResponseEntity<>(map, HttpStatus.OK);
   }
   
}
