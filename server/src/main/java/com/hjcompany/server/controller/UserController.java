package com.hjcompany.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hjcompany.server.dto.CustomUser;
import com.hjcompany.server.dto.Users;
import com.hjcompany.server.service.UserServiceImpl;

import lombok.extern.slf4j.Slf4j;

/**
 * JwtReuestFilter에서 이미 jwt 토큰 해석을 하고 유효한지 체크 후 SecurityContextHolder의 SecurityContext에 등록한 상태
 * 여기에 등록된 CustomUser를 AuthenticationPrincipal가 가져온다
 */

@Slf4j
@RestController
@RequestMapping("/users")
public class UserController {
   
   @Autowired
   private UserServiceImpl userService;

   /*
      원래는 /users/10 이렇게 주소/아이디 이렇게 넣는게 Restful에 더 가깝지만 지금은 연습이니깐 그냥 한다
      [GET 조회]        /users/info    - 회원정보 조회   (ROLE_USER)
      [POST 생성]       /users         - 회원가입        ALL
      [PUT 업데이트]    /users         - 회원정보 수정   (ROLE_USER) 
      [DELETE 삭제]     /users/{아이디}         - 회원탈퇴        (ROLE_ADMIN)
   */

   /*
    * 사용자 정보 조회 
    * @param customUser
    * @return
    */
   @Secured("ROLE_USER") //USER 권한 설정
   @GetMapping("/info")
   public ResponseEntity<?> userInfo(@AuthenticationPrincipal CustomUser customUser) {
      log.info("UserController.java - userInfo 주소 /info");
      log.info("customUser : " + customUser);

      Users user = customUser.getUser();
      log.info("user : " + user);

      //인증된 사용자 정보
      if(user != null){
         return new ResponseEntity<>(user, HttpStatus.OK);
      }

      //인증 되지 않음
      return new ResponseEntity<>("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
   }
    
   //회원가입
   @PostMapping("/join") //회원가입은 누구나 들어와야 하기 때문에 따로 권한지정을 하지 않았다
   public ResponseEntity<?> join(@RequestBody Users user) throws Exception {
      log.info("UserController.java - join 주소 /");

      log.info("[post] - users : " + user);
      int result = userService.insert(user);

      if(result > 0){
         log.info("회원 가입 성공! - SUCCESS");
         return new ResponseEntity<>("SUCCUESS",HttpStatus.OK);
      }
      else{
         log.info("회원 가입 실패! - FAIL");
         return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
      } 
   }

   //회원정보 수정
   @Secured("ROLE_USER") //USER 권한 설정
   /*SecurityConfig파일의 @EnableMethodSecurity(prePostEnabled=true, securedEnabled=true)securedEnabled 설정을 했기 때문에 사용가능*/
   @PutMapping("/update")
   public ResponseEntity<?> update(@RequestBody Users user) throws Exception {
      log.info("UserController.java - update 주소 /");

      log.info("[put] - /users");
      int result = userService.update(user);
      
      if(result > 0){
         log.info("회원 정보 수정 성공! - SUCCESS");
         return new ResponseEntity<>("SUCCUESS",HttpStatus.OK);
      }
      else{
         log.info("회원 정보 수정 실패! - FAIL");
         return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
      } 
   }

   //회원정보 탈퇴
   //@Secured("ROLE_ADMIN")
   @Secured("ROLE_USER")
   @DeleteMapping("/{userId}")
   public ResponseEntity<?> destory(@PathVariable("userId") String userId) throws Exception{
      log.info("UserController.java - destory 주소 /{userId}");

      int result = userService.delete(userId);

      if(result > 0){
         log.info("회원 삭제 성공! - SUCCESS");
         return new ResponseEntity<>("SUCCUESS",HttpStatus.OK);
      }
      else{
         log.info("회원 삭제 실패! - FAIL");
         return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
      } 
   }
}
