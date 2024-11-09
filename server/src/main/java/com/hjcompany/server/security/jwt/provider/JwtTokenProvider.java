package com.hjcompany.server.security.jwt.provider;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.hjcompany.server.dto.CustomUser;
import com.hjcompany.server.dto.UserAuth;
import com.hjcompany.server.dto.Users;
import com.hjcompany.server.mapper.UserMapper;
import com.hjcompany.server.prop.JwtProps;
import com.hjcompany.server.security.jwt.constants.JwtConstants;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

/*
 *  JWT 토큰 관련 기능을 제공해주는 클래스
 *  - 토큰 생성
 *  - 토큰 해석
 *  - 토큰 유효성 검사
 */

 @Slf4j
 @Component
 public class JwtTokenProvider {

   /*
    * prop/JwtProps.java파일에서 application.properties에 설정되어있는 SecretKey를 가져오고,
    * JwtProps클래스가 component로 등록되어 있기 때문에 @Autowired로 JwtProps클래스를 사용할 수 있다
   */
   @Autowired
   private JwtProps jwtProps;

   @Autowired
   private UserMapper userMapper;

   //토큰 생성
   public String createToken(int userNo, String userId, List<String> roles) {

        log.info("JwtTokenProvider.java의 createToken 메소드");

       // JWT 토큰 생성
       String jwt = Jwts.builder()
               .signWith(getShaKey(), Jwts.SIG.HS512)      // 서명에 사용할 키와 알고리즘 설정
               // .setHeaderParam("typ", SecurityConstants.TOKEN_TYPE)        // deprecated (version: before 1.0)
               .header()                                                      // update (version : after 1.0)
                   .add("typ", JwtConstants.TOKEN_TYPE)              // 헤더 설정
               .and()
               .expiration(new Date(System.currentTimeMillis() + 864000000))  // 토큰 만료 시간 설정 (10일)
               .claim("uno", "" + userNo)                                // 클레임 설정: 사용자 번호
               .claim("uid", userId)                                     // 클레임 설정: 사용자 아이디
               .claim("rol", roles)                                      // 클레임 설정: 권한
               .compact();      

       log.info("jwt : " + jwt);

       return jwt;
   }
   
   /**
    * 토큰 해석
    * 
    * Authorization : Bearer + {jwt}  (authHeader)
    * ➡ jwt 추출 
    * ➡ UsernamePasswordAuthenticationToken
    * @param authHeader
    * @return
    * @throws Exception
    */
   public UsernamePasswordAuthenticationToken getAuthentication(String authHeader) {

    log.info("JwtTokenProvider.java의 getAuthentication 메소드");

       if(authHeader == null || authHeader.length() == 0 ) 
           return null;

       try {
           
           // jwt 추출 
           String jwt = authHeader.replace(JwtConstants.TOKEN_PREFIX, "");

           // JWT 파싱
           Jws<Claims> parsedToken = Jwts.parser()
                                           .verifyWith(getShaKey())
                                           .build()
                                           .parseSignedClaims(jwt);    

           log.info("parsedToken : " + parsedToken);

           // 인증된 사용자 번호
           String userNo = parsedToken.getPayload().get("uno").toString();
           int no = ( userNo == null ? 0 : Integer.parseInt(userNo) );
           log.info("userNo : " + userNo);

           // 인증된 사용자 아이디
           String userId = parsedToken.getPayload().get("uid").toString();
           log.info("userId : " + userId);

           // 인증된 사용자 권한
           Claims claims = parsedToken.getPayload();
           Object roles = claims.get("rol");
           log.info("roles : " + roles);


           // 토큰에 userId 있는지 확인
           if( userId == null || userId.length() == 0 )
               return null;


           Users user = new Users();
           user.setNo(no);
           user.setUserId(userId);
           // 권한도 바로 Users 객체에 담아보기
           List<UserAuth> authList = ((List<?>) roles )
                                           .stream()
                                           .map(auth -> new UserAuth(userId, auth.toString()) )
                                           .collect( Collectors.toList() );
           user.setAuthList(authList);

           // CustomeUser 에 권한 담기
           List<SimpleGrantedAuthority> authorities = ((List<?>) roles )
                                                       .stream()
                                                       .map(auth -> new SimpleGrantedAuthority( (String) auth ))
                                                       .collect( Collectors.toList() );

           // 토큰 유효하면
           // name, email 도 담아주기
           try {
               Users userInfo = userMapper.select(no);
               if( userInfo != null ) {
                   user.setName(userInfo.getName());
                   user.setEmail(userInfo.getEmail());
               }
           } catch (Exception e) {
               log.error(e.getMessage());
               log.error("토큰 유효 -> DB 추가 정보 조회시 에러 발생...");
           }

           UserDetails userDetails = new CustomUser(user);

           // new UsernamePasswordAuthenticationToken( 사용자정보객체, 비밀번호, 사용자의 권한(목록)  );
           return new UsernamePasswordAuthenticationToken(userDetails, null, authorities);

       } catch (ExpiredJwtException exception) {
           log.warn("Request to parse expired JWT : {} failed : {}", authHeader, exception.getMessage());
       } catch (UnsupportedJwtException exception) {
           log.warn("Request to parse unsupported JWT : {} failed : {}", authHeader, exception.getMessage());
       } catch (MalformedJwtException exception) {
           log.warn("Request to parse invalid JWT : {} failed : {}", authHeader, exception.getMessage());
       } catch (IllegalArgumentException exception) {
           log.warn("Request to parse empty or null JWT : {} failed : {}", authHeader, exception.getMessage());
       }

       return null;
   }

   /*
   토큰 유효성 검사 - 만료기간이 넘었는지 판단 하는 과정
   유효하다 - true반환   
   만료가 되었다 - false반환
   */
   public boolean validateToken(String jwt){

    log.info("JwtTokenProvider.java의 validateToken 메소드");

      try {
         //유효성 검사는 파싱을 다시 해봐야 한다
         //JWT 파싱 - 만료기간을 가져오기 위해서 파싱해서 데이터를 가져온다
         Jws<Claims> parsedToken = Jwts.parser()
         .verifyWith(getShaKey())
         .build()
         .parseSignedClaims(jwt);    

         /*
         * PAYLOAD
         * {
         *    "exp" : 1703140095, <- 만료기한 추출
         *    "num" : 10,
         *    "uid" : "hjcompany",
         *    "rol" : [
         *                "ROLE_USER"
         *          ]
         * } 
         */

         Date exp = parsedToken.getPayload().getExpiration();

         log.info("--- 토큰 만료 기간 ---");
         log.info("-> " + exp);

         /* 만료 시간과 오늘 시간 비교. 만료 시간이 더 전인지 판단하는 함수
         만료 시간 : 2023.12.01
         오늘 날짜 : 2023.12.05
         => true 반환 => 기간이 만료 되었다
         */
         boolean reuslt = exp.before(new Date()); 

         return !reuslt; //기간이 남았으면 true 반환, 만료 되었으면 false반환

         }catch (ExpiredJwtException exception) {
            log.error("Token Expired");                 // 토큰 만료 
            return false;
        } catch (JwtException exception) {
            log.error("Token Tampered");                // 토큰 손상
            return false;
        } catch (NullPointerException exception) {
            log.error("Token is null");                 // 토큰 없음
            return false;
        } catch (Exception e) {
	        return false;
	    }
   }

   // secretKey ➡ signingKey
   private byte[] getSigningKey() {
		return jwtProps.getSecretKey().getBytes();
	}

    // secretKey ➡ (HMAC-SHA algorithms) ➡ signingKey
    private SecretKey getShaKey() {
        return Keys.hmacShaKeyFor(getSigningKey());
    }
}
