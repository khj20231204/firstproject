package com.hjcompany.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Service;

import com.hjcompany.server.dto.UserAuth;
import com.hjcompany.server.dto.Users;
import com.hjcompany.server.mapper.UserMapper;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Autowired
   private PasswordEncoder passwordEncoder; //비밀번호 암호화 */

   @Autowired
   private UserMapper userMapper;

   @Autowired
   private AuthenticationManager authenticationManager; //로그인 인증 관리
   /**
     회원 등록(회원 가입)
      1. 비밀번호 암호화
      2. 회원 등록
      3. 권한 등록
    */

   @Override
   public int insert(Users users) throws Exception {

      log.info("UserServiceImpl.java의 insert 메소드");
      
      //비밀번호 암호화
      String userPw = users.getUserPw();
      String encodePw = passwordEncoder.encode(userPw);
      users.setUserPw(encodePw); 

      //회원 등록
      int result = userMapper.insert(users);

      //권한 등록
      if(result > 0){
         UserAuth userAuth = new UserAuth();
         userAuth.setUserId(users.getUserId());
         userAuth.setAuth("ROLE_USER"); //기본 권한 : 사용자 권한(ROLE_USER)
         result = userMapper.insertAuth(userAuth);
      }
      
      return result;
   }

   //회원 조회
   @Override
   public Users select(int userNo) throws Exception {

      log.info("UserServiceImpl.java의 select 메소드");

      return userMapper.select(userNo);
   }

   //로그인
   /* HttpServletRequest requset : 클라이언트로부터 요청이 일어났을 때 넘겨받는 request */
   @Override
   public void login(Users user, HttpServletRequest requset) throws Exception {

      log.info("UserServiceImpl.java의 login 메소드");

      String username = user.getUserId();
      String passsword = user.getUserPw();

      log.info("username : " + username);
      log.info("password : " + passsword);

      /*
      AuthenticationManager : 인증을 관리하는 객체
      ID와 PW를 가져와서 인증여부를 확인 후 인증된 사용자를 SpringSecurityContext에 등록
      => 의존 주입을 받아 사용
       */

      //아이디, 패스워드 인증 토큰 생성
      /* 
      UsernamePasswordAuthenticationToken : Authentication 인터페이스의 구현체 중 하나로, 
      사용자 이름과 비밀번호를 기반으로 인증을 수행하는 토큰입니다. 
      */
      UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(username, passsword);

      //토큰에 요청정보 등록
      /*
      user의 아이디와 패스워드가 실제 
      login(Users user, HttpServletRequest requset)의 request 요청으로 온 것인지 확인
      */
      token.setDetails(new WebAuthenticationDetails(requset));

      //토큰을 이용하여 인증 요청 - 로그인
      /* token안에 아이디와 비밀번호 정보가 있기 때문에 스프링 시큐리티에서 DB의 아이디, 비밀번호와 일치하는 인증 처리 
       * Authentication : 인증된 주체(authenticated principal)**에 대한 정보를 담고 있는 클래스  
       * 사용자가 시스템에 접근하려 할 때, 해당 사용자가 누구인지, 
       * 어떤 권한을 가지고 있는지 등의 정보를 나타내는 객체입니다. 
       * 
       * AuthenticationManager : 사용자의 인증 요청을 받아서 실제 인증 로직을 수행합니다.
      */
      Authentication authentication = authenticationManager.authenticate(token);

      log.info("인증 여부 : " + authentication.isAuthenticated());

      //시큐리티 컨텍스트 : 현재 인증된 사용자 정보를 담고 있는 보안 컨텍스트
      /* Authentication으로 인증 절차가 성공되면 컨텍스트에 등록 
       * 실제 시큐리티 컨텍스트에 등록이 되어야 사용자 정보를 가져와 이후 CURD나 비즈니스 로직 처리를 할 수 있다
      */
      SecurityContextHolder.getContext().setAuthentication(authentication);

      //User는 사용자가 만든 User가 아니라 스프링 시큐리티가 제공하는 User
      User authUser = (User)authentication.getPrincipal();

      log.info("인증된 사용자 : " + authUser.getUsername());

   }

   //회원 정보 수정
   @Override
   public int update(Users users) throws Exception {

      //비밀번호 암호화
      String userPw = users.getUserPw();
      String encodedPw = passwordEncoder.encode(userPw);
      users.setUserPw(encodedPw);
      
      int result = userMapper.update(users);

      return result;
   }

   //회원 정보 삭제(회원 탈퇴)
   @Override
   public int delete(String userId) throws Exception {
      return userMapper.delete(userId);
   }
}
