package com.hjcompany.server.security.custom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hjcompany.server.dto.CustomUser;
import com.hjcompany.server.dto.Users;
import com.hjcompany.server.mapper.UserMapper;

import lombok.extern.slf4j.Slf4j;

// CustomUser -> CustomUserDetailService -> SecurityConfig
/*
 * CustomUserDetailService의 역할 :
 * 스프링 시큐리티가 사용자 정보를 읽어들일 때 사용하는 클래스로 설정.
 * 시큐리티가 AuthenticationManager(인증 관리자)가 authenticate메소드를 호출하면
 * 인증처리로 넘어가게 되는데 인증을 하려면 사용자 정보가 필요하다. 이때 이 로직이 실행되어서
 * 데이터 베이스에 있는 아이디, 패스워드 값과 다른 요청값을 비교하게 된다.
 */

@Slf4j
@Service
public class CustomUserDetailService implements UserDetailsService {
   
   @Autowired
   private UserMapper userMapper;

   //username(사용자 아이디)으로 사용자 정보를 읽어오는 메소드
   @Override
   public UserDetails loadUserByUsername(String username) {
      log.info("CustomUserDetailService.java의 loadUserByUsername 메소드");
      
      log.info("login - loadUserByUsername 클래스 : " + username);

      Users user = userMapper.login(username);

      if(user == null){ //없는 사용자로 로그인 요청을 보낸 경우
         log.info("사용자 없음.. (일치하는 아이디가 없습니다)");

         throw new UsernameNotFoundException("사용자를 찾을 수 없습니다 : " + username);
      }

      log.info("user : " + user.toString());

      //Users -> CustomUser
      CustomUser customUser = new CustomUser(user);

      log.info("customUser : " + customUser.toString());

      return customUser;
   }
}
