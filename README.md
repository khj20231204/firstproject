

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
       <img src="" 
      <table style="border:2px solid black"><tr><td>
      Client는 React로 구현하였고 Server는 SpringBoot로 구현했습니다. 클라이언트와 서버는 axios를 이용하여 데이터를 주고 받습니다. 최초 로그인 후 서버로부터 JWT를 받아오게 되고 해석된 JWT값들은 Context로 모든 컴포넌트에 정보가 전달됩니다. 최초 로그인 시에만 서버로 접속을 하고 이후부터는 로컬에 저장된 JWT 정보로 로그인 유무를 판단하게 됩니다. JAVA로 구현된 서버는 MVC패턴을 따르며 MyBatis를 이용하여 RDS에 있는 MySQl에 데이터가 저장됩니다.
       </td></tr></table>

   1. ## JWT
   최초 로그인을 하면 
      ```
        String jwt = Jwts.builder()
           .signWith(getShaKey(), Jwts.SIG.HS512)    
           .header()                                                
           .add("typ", JwtConstants.TOKEN_TYPE)            
           .and()
           .expiration(new Date(System.currentTimeMillis() + (60*60*24))  // 토큰 만료 시간 설정 (10일)
           .claim("uno", "" + userNo)                                // 클레임 설정: 사용자 번호
           .claim("uid", userId)                                     // 클레임 설정: 사용자 아이디
           .claim("rol", roles)                                      // 클레임 설정: 권한
           .compact();      
      ```
  
