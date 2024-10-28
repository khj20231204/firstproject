package com.hjcompany.server.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.hjcompany.server.security.custom.CustomUserDetailService;
import com.hjcompany.server.security.jwt.filter.JwtAuthenticationFilter;
import com.hjcompany.server.security.jwt.filter.JwtRequestFilter;
import com.hjcompany.server.security.jwt.provider.JwtTokenProvider;

import lombok.extern.slf4j.Slf4j;

/* @EnableMethodSecurity(prePostEnabled=true, securedEnabled=true)
 * prePostEnable : 메서드 실행 전, 후 에 권한 검사를 수행   
 * securedEnabled : @secured 어노테이션을 이용하여 메서드에 대한 접근 권한을 제어   
 */
@Slf4j
@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled=true, securedEnabled=true)
public class SecurityConfig {
   
   @Autowired
   private CustomUserDetailService customUserDetailService;

   @Autowired
   private JwtTokenProvider jwtTokenProvider;

   //시큐리티 설정
   @Bean
   public SecurityFilterChain securityFilerChain(HttpSecurity http) throws Exception{
      log.info("SecurityConfig.java securityFilerChain 메소드");

      //폼 기반 로그인 비활성화
      http.formLogin(login -> login.disable());

      //HTTP 기본 인증 비활성화
      http.httpBasic(basic -> basic.disable());

      //CSRF(Cross-Site Request Forgery) 공격 방어 기능 비활성화
      http.csrf(csrf -> csrf.disable());

      //필터 설정
      http.addFilterAt(new JwtAuthenticationFilter(authenticationManager, jwtTokenProvider), UsernamePasswordAuthenticationFilter.class).addFilterBefore(new JwtRequestFilter(authenticationManager, jwtTokenProvider),UsernamePasswordAuthenticationFilter.class);

      //인가 설정
      http.authorizeHttpRequests((auth) -> auth
         .requestMatchers("/admin/**").hasRole("ADMIN")
         .requestMatchers("/users/**").permitAll() //이미 controller에서 secured로 체크를 하니깐 permitall() 한다.
         .requestMatchers("/", "/login").permitAll()
         .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll() 
         .anyRequest().authenticated());
      /* 
      PathRequest.toStaticResources().atCommonLocations()
      일반적으로 사용되는 정적 리소스 위치 (예: classpath:/static, classpath:/public, classpath:/resources, file:/absolute/path/to/static)를 가리킵니다.  이 부분은 CSS, JavaScript, 이미지 파일 등과 같은 정적 파일들이 위치한 디렉토리를 지정하는 역할을 합니다.
      */

      //인증 방식 설정
      http.userDetailsService(customUserDetailService);

      return http.build();
   }

   //암호화 알고리즘 방식 : Bcrypt
   @Bean
   public PasswordEncoder passwordEncoder(){
      log.info("SecurityConfig.java의 PasswordEncoder 메소드");

      return new BCryptPasswordEncoder();
   }

   //AuthenticationManager 빈 등록
   private AuthenticationManager authenticationManager;

   @Bean
   public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception{
      log.info("SecurityConfig.java의 authenticationManager 메소드");

      this.authenticationManager = authenticationConfiguration.getAuthenticationManager();
      return authenticationManager;
   }
}
