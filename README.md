

# 주말에 운영하는 약국 찾기

1. # 프로젝트 개요💡
    주말에 갑작스러운 통증이 있는 경우, 병원을 가기에 부담이 되고 참기엔 힘든 통증인 경우 우리는 약국을 떠올리게 됩니다. 이런 경우를 대비하여 자신의 주변에 주말에도 운영이 되는 약국을 찾을 수 있다면 비상시에 많은 도움이 될 것입니다. 
  
     프로젝트 기간 : 2024.10.21 ~ 2024.11.22   
     개발 인원 : 1명   
     JDK17 LTS    
     React 18
  
    ![HTML5](https://img.shields.io/badge/html5-red.svg?style=for-the-badge&logo=html5&logoColor=white)
    ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
    ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
    ![React](https://img.shields.io/badge/React-%23FF9900.svg?style=for-the-badge&logo=react&logoColor=white)
    ![JAVA](https://img.shields.io/badge/java-%231572B6.svg?style=for-the-badge&logo=java&logoColor=blue)
    ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=aws&logoColor=white)
    ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
    ![MySql](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
    ![SpringBoot](https://img.shields.io/badge/springboot-green.svg?style=for-the-badge&logo=springboot&logoColor=white)
  
1. # 데모 영상📽️
     https://www.youtube.com/@HJk-wj7uh
  
1. # 테이블 설계📲
     <img src="https://github.com/khj20231204/firstproject/blob/main/pharm_db.png?raw=true" width="100%">
  
1. # 개발 개요📖
     <table style="border:2px solid black"><tr><td>
    이번 프로젝트에서는 앞서 진행한 프로젝트 이외의 기능으로 구현하고 싶었습니다. 서버와 클라이언트를 구분하여 서버 쪽은 JAVA로 클라이언트 쪽은 React로 구현했습니다. React를 사용하면 Session을 사용할 수 없기 때문에 JWT와 StpringSecurity를 적용했습니다. React를 이용하여 게시판을 만들었고 1만6천개의 약국정보를 API를 이용하여 가져와 XML파일을 JSON파일로 변환 후 Parsing하여 서버쪽에서 원하는 데이터만 잘라내어 RDS에 저장했습니다. 시/도 구/군 별로 검색이 가능하고 현재 자신의 위치에서 약국까지 도보 경로를 그려줍니다. 서버쪽은 EC2로 배포를 끝냈습니다.   
    </td></tr></table>
  
1. # 개발 환경👨‍💻
   <img src="https://github.com/khj20231204/firstproject/blob/main/pharm_tools2.png?raw=true" width="100%">   
  
1. # 주요 기능

   1. ## Client와 Server의 분리
       <br>
       <img src="https://github.com/khj20231204/firstproject/blob/main/client_server.png?raw=true" style="border:3px solid black;border-radius:9px;width:200px">
      <table style="border:2px solid black"><tr><td>
      Client는 React로 구현하였고 Server는 SpringBoot로 구현했습니다. 클라이언트와 서버는 axios를 이용하여 데이터를 주고 받습니다. 사용자 정보는 Context를 통해 모든 컴포넌트에 정보가 전달됩니다. JAVA로 구현된 서버는 MVC패턴을 따르며 MyBatis를 이용하여 RDS에 있는 MySQl에 데이터가 저장됩니다. 첫 로그인 시 서버로부터 JWT를 받아 쿠키에 저장합니다. 이후 로그인시 마다 JWT를 서버로 전송하여 유효성을 검증받고 userInfo 값을 받아오게 됩니다. 세션을 사용할 때는 세션 관리를 서버가 해야하지만 JWT를 사용할 경우에는 인증 절차만 거치면 됩니다.
       </td></tr></table>

   1. ## JWT
      서버 - 최초 로그인을 하면 서버에서 JWT를 생성   
      ```
        String jwt = Jwts.builder()
           .signWith(getShaKey(), Jwts.SIG.HS512)    
           .header()                                                
           .add("typ", JwtConstants.TOKEN_TYPE)            
           .and()
           .expiration(new Date(System.currentTimeMillis() + (60*60*24))  
           .claim("uno", "" + userNo)                              
           .claim("uid", userId)                                    
           .claim("rol", roles)                                      
           .compact();      
      ```   

      서버 - 클라이언트로부터 받은 JWT를 해석   
      ```
         String jwt = authHeader.replace(JwtConstants.TOKEN_PREFIX, "");
         Jws<Claims> parsedToken = Jwts.parser()
               .verifyWith(getShaKey())
               .build()
               .parseSignedClaims(jwt);    
      ```   
   
      클라이언트 - 쿠키에 저장된 JWT를 가져와 Header에 JWT를 추가 후 전송   
      ```
          const accessToken = Cookies.get("accessToken");
          api.defaults.headers.common.Authorization = `Bearer ${accessToken}`
          response = await auth.info();
      ```
      
   1. ## SpringSecurity
  
   1. ## 게시판
      리액트로 구현한 게시판으로 로그인, 원글에 대한 CRUD, 댓글에 대한 CRUD를 구현했습니다. 로그인의 경우 JWT를 이용하여 구현이 되었고 상단 왼쪽에 암호화된 토큰값과 인코딩된 payload정보를 보여주도록 했습니다.
       <table style="border:2px solid black">
           <tr>
               <td><img src="https://github.com/khj20231204/firstproject/blob/main/login.gif?raw=true" width="200px"></td>
               <td><img src="https://github.com/khj20231204/firstproject/blob/main/board_write.gif?raw=true" width="200px"></td>
               <td><img src="https://github.com/khj20231204/firstproject/blob/main/pharm_comment.gif?raw=true" width="200px"></td>
               <td><img src="https://github.com/khj20231204/firstproject/blob/main/PHARM_board_search.gif?raw=true" width="200px"></td>
           </tr>
       </table>

   1. ## 약국 정보를 출력 / 경로 탐색 기능 맵
      생활안전정보에서 전국 1만6천개 정도의 약국에 대한 정보를 xml파일로 가져와 Json으로 변환 후 parseing과정을 거쳐 서버로 넘겨주고 서버측에서 원하는 데이터만 잘라 RDS에 저장했습니다.
      자신이 위치한 곳에서 선택한 약국까지 경로를 탐색하여 지도상에 나타내줍니다. 목적지까지 걸리는 거리과 시간을 표시합니다.   
      <table style="border:2px solid black">
         <tr>
             <td><img src="https://github.com/khj20231204/firstproject/blob/main/PHARM_map.gif?raw=true" width="300px"></td>
         </tr>
      </table>

   1. ## 검색 기능 맵
      시/도, 구/군, 약국명으로 검색이 가능하도록 했습니다. 자신의 위치한 곳에서 주말에 운영이 되는 약국을 검색할 수 있습니다.
      <table style="border:2px solid black">
         <tr>
             <td><img src="https://github.com/khj20231204/firstproject/blob/main/PHARM_map_search.gif?raw=true" width="300px"></td>
         </tr>
      </table>
  
