package com.hjcompany.server.security.jwt.filter;

import java.io.IOException;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.hjcompany.server.security.jwt.constants.JwtConstants;
import com.hjcompany.server.security.jwt.provider.JwtTokenProvider;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

/*
 * jwt 토큰이 넘어왔을 때 작동해야하는 필터
 * -> 토큰을 해석하는 역할의 필터
 * OncePerRequestFilter : 한 요청당 한 번만 실행되는 필터
 */

@Slf4j
public class JwtRequestFilter extends OncePerRequestFilter {
   
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    // 생성자
    public JwtRequestFilter( AuthenticationManager authenticationManager,  JwtTokenProvider jwtTokenProvider ) {

        log.info("JwtRequestFilter.java의 생성자");

        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
    }
        
    
   /*
   jwt 요청 필터
      - request > headers > Authorization에 들었는 토큰을 꺼낸다
      - jwt 토큰 유효성 검사
   */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        log.info("JwtRequestFilter.java의 doFilterInternal 메소드");
        
        // HTTP 헤더에서 토큰을 가져옴
        String header = request.getHeader(JwtConstants.TOKEN_HEADER);
        log.info("authorization : " + header);

        
        // Bearer + {jwt} 체크
        // 헤더가 없거나 형식이 올바르지 않으면 다음 필터로 진행
        if (header == null || header.length() == 0 || !header.startsWith(JwtConstants.TOKEN_PREFIX)) {
            /*
            토큰이 존재하지 않는다 
            1.회원가입을 하지 않은 회원
            2.회원가입은 했는데 로그인은 하지 않은 회원
            -> 다음 필터로 넘긴다
            filterChain.doFilter : 이 메서드를 호출하면 현재 필터를 포함하여 필터 체인에 등록된 모든 필터들이 순서대로 실행되도록 합니다.
            */
            log.info("----------------------doFilterInternal의 doFilter 전 --------------------------------");
            filterChain.doFilter(request, response);
            log.info("----------------------doFilterInternal의 doFilter 후 --------------------------------");
            return;
        }
        
         /*
         * 클라이언트 요청 -------> jwtRequest 필터 -------> jwtAuth 필터
         * 토큰이 없는 경우 jwtRequest에서 jwtAut필터로 넘긴다
         * 이 경우는 로그인을 요청한 경우로 로그인시 두 필터를 다 넘긴다
         */
        // JWT
        // Bearer + ${jwt} ➡ "Bearer " 제거
        String jwt = header.replace(JwtConstants.TOKEN_PREFIX, "");
        System.out.println("JwtRequestFilter jwt:"+jwt);

        // 토큰을 사용하여 Authentication 객체 생성
        Authentication authentication = jwtTokenProvider.getAuthentication(jwt);

        // 토큰 유효 검사 (토큰이 만료되지 않았으면)
        if( jwtTokenProvider.validateToken(jwt) ) {
            log.info("유효한 JWT 토큰입니다.");
            // [로그인]
            // SecurityContextHolder(사용자 보안정보를 담는 객체)에
            // Authentication(사용자 인증 정보) 객체를 설정
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        
        // 다음 필터로 진행
        filterChain.doFilter(request, response);
    }
}
