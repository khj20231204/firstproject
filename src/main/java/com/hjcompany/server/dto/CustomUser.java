package com.hjcompany.server.dto;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

/*
 * CustomUser : 사용자 정보의 dto인 Users를 스프링 시큐리티에 맞는 형식으로 만들어서 넘겨줘야 하는데
 * 이때, Users의 형식을 만들기 위한 용도로 만든 객체
 * security/custom/CustomUserDetailService.java에서 시큐리티에 맞는 형식을 갖춘 CustomerUser를 
 * UserDetails로 return하게 된다.
 * UserDetails형식으로 CustomerUser를 리턴하기 위해선 CustomerUser가 UserDetails를 상속받아야 한다.
 *
 */

@Slf4j
@Data
public class CustomUser implements UserDetails {

   private Users user;

   public CustomUser(Users user){
      System.out.println("CustomUser.java의 생성자");
      log.info("CustomUser.java의 생성자");

      this.user = user;
   }

   /**
    권한 getter메소드
    List<UserAuth> --> Collection<SimpleGrantedAuthority> (auth) 
    */
   @Override
   public Collection<? extends GrantedAuthority> getAuthorities() {

      log.info("CustomUser.java의 getAuthorities 메소드");

      /* Users DTO의 List<UserAuth> authList */
      List<UserAuth> authList = user.getAuthList();

      /* Users에서 가져온 authList에는 auth_no, user_id, auth가 있는 스프링 시큐리티가 필요로 하는 건 auth밖에 없다. 그래서 가져온 authList에서 스트림으로 auth만 뽑는다 */
      //SimpleGrantedAuthority() - "ROLE_USER"
      Collection<SimpleGrantedAuthority> roleList = authList.stream()
                                       .map((auth) -> new SimpleGrantedAuthority(auth.getAuth()))
                                       .collect(Collectors.toList());
      return roleList;
   }

   @Override
   public String getPassword() {
      return user.getUserPw();
   }

   @Override
   public String getUsername() {
      return user.getUserId();
   }

   /* 밑에 메소드로 권한을 얻어 올 수 있고, 락을 확인 할 수도 있는데 
    * 지금 당장 필요한건 위에 패스워와 아이디기 때문에 일단 위에 메소드 2개만 오버라이드
   */
   @Override
   public boolean isAccountNonExpired() {
      return true;
   }

   @Override
   public boolean isAccountNonLocked() {
      return true;
   }

   @Override
   public boolean isCredentialsNonExpired() {
      return true;
   }

   @Override
   public boolean isEnabled() {
      return user.getEnabled() == 1 ? true : false;
   }
   
}
