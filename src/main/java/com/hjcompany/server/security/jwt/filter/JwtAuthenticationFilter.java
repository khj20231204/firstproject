package com.hjcompany.server.security.jwt.filter;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.hjcompany.server.dto.CustomUser;
import com.hjcompany.server.security.jwt.constants.JwtConstants;
import com.hjcompany.server.security.jwt.provider.JwtTokenProvider;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

/*
 * client -> filter(/login) -> server
 * username, password로 인증 시도 : attemptAuthentication 실행
 * 인증 성공하면 실행 : successfulAuthentication 실행
 *  => JWT 생성 
 *  => response > headers ? authorization : jwt저장
 * 인증 실패 : response > status > 401
 */

//필터 생성 클래스
//스프링 시큐리티와 연결이 되기 위해서 UsernamePasswordAuthenticationFilter를 상속
@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter{
   
   /*
   이런식으로 사용이 불가능하다
   밑에 생성자로 가져와서 사용

   @Autowired
   private AuthenticationManager authenticationManager;

   @Autowired
   JwtTokenProvider jwtTokenProvider;
   */

   private AuthenticationManager authenticationManager;
   private JwtTokenProvider jwtTokenProvider;

   //생성자
   public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider){
      log.info("JwtAuthenticationFilter.java의 생성자");

      this.authenticationManager = authenticationManager;
      this.jwtTokenProvider = jwtTokenProvider;

      //필터 url 경로 설정 : /login
      setFilterProcessesUrl(JwtConstants.AUTH_LOGIN_URL);
   }

   /* 
   요청이 오면 필터를 통해 거르게 되는데 attemptAuthentication에서 /login 경로로만 요청이 왔을 때 거르는 기능으로 설정,
   request에서 사용자 정보를 가져와 인증을 하는 기능까지 작성
   : /login 경로로 요청하면, 필터로 걸러서 인증을 시도
    */
   //인증 시도 필터 메소드
   @Override
   public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
         throws AuthenticationException {

      log.info("JwtAuthenticationFilter.java의  attemptAuthentication 메소드");

      String username = request.getParameter("username");
      String password = request.getParameter("password");

      log.info("JwtAuthenticationFilter username : " + username);
      log.info("JwtAuthenticationFilter password : " + password);

      //사용자 인증정보 객체 생성
      //아이디와 비번이 있으면 토큰을 만들 수 있다
      Authentication authentication = new UsernamePasswordAuthenticationToken(username, password);
      /* CustomUserDetailService.java로 넘어간다
      CustomUserDetailService의 역할 : 스프링 시큐리티가 사용자 정보를 읽어들일 때 사용하는 클래스로 설정 */

      //사용자 인증 (로그인) - 위에서 만든 authentication 토큰으로 사용자 인증 진행
      /*
       * authenticationManager : SecurityConfig.java에서 빈으로 등록
       */
      authentication = authenticationManager.authenticate(authentication);

      log.info("인증 여부:"+ authentication.isAuthenticated());

      //인증 실패 (username, password 불일치)
      if(!authentication.isAuthenticated()){
         log.info("인증 실팽 : 아이디 또는 비밀번호가 일치하지 않습니다.");
         response.setStatus(401);
      }

      return authentication; //authentication이 인증이 되면 밑에 successfulAuthentication가 호출 됨
   }

   /*
   인증이 성공 됐을 때 실행될 메소드
   - JWT을 생성
   - JWT를 응답 헤더에 설정
   */
   @Override
   protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
         Authentication authentication) throws IOException, ServletException {
         
         log.info("JwtAuthenticationFilter.java의 successfulAuthentication 메소드");

         log.info("인증 성공");

         CustomUser user = (CustomUser) authentication.getPrincipal();
         int userNo = user.getUser().getNo();
         String userId = user.getUser().getUserId();

         List<String> roles = user.getUser().getAuthList().stream()
                              .map((auth) -> auth.getAuth())
                              .collect(Collectors.toList());

         // JWT                              
         String jwt = jwtTokenProvider.createToken(userNo, userId, roles);

         // {Authentication : Bearer + {jwt} }
         response.addHeader(JwtConstants.TOKEN_HEADER, JwtConstants.TOKEN_PREFIX + jwt);
         response.setStatus(200);
   }
}
