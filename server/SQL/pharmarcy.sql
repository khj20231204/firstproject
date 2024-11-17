-- Active: 1731150471586@@127.0.0.1@3306@membersdb

create table phamarcy(
   pharmnum int AUTO_INCREMENT PRIMARY key -- pk
   , num int -- 일련번호
   , dutyaddr varchar(200) -- 주소
   -- dutyetc varchar(100) -- 비고
   -- dutyinf varchar(100) 기관설명상세
   -- dutymapimg varchar(300) 간이약도
   , dutyname varchar(100) -- 기관명
   , dutytel1 varchar(100) -- 대표전화
   , dutytime1c varchar(10) -- 월요일
   , dutytime2c varchar(10) -- 화요일
   , dutytime3c varchar(10) -- 수요일
   , dutytime4c varchar(10) -- 목요일
   , dutytime5c varchar(10) -- 금요일
   , dutytime6c varchar(10) -- 토요일
   , dutytime7c varchar(10) -- 일요일
   , dutytime8c varchar(10) -- 공휴일
   , dutytime1s varchar(10) -- 월요일
   , dutytime2s varchar(10) -- 화요일
   , dutytime3s varchar(10) -- 수요일
   , dutytime4s varchar(10) -- 목요일
   , dutytime5s varchar(10) -- 금요일
   , dutytime6s varchar(10) -- 토요일
   , dutytime7s varchar(10) -- 일요일
   , dutytime8s varchar(10) -- 공휴일
   , hpid varchar(20) -- 기관id
   , postcdn1 varchar(10) -- 우편번호1
   , postcdn2 varchar(10) -- 우편번호2
   , lon varchar(50) -- 경도
   , lat varchar(50) -- 위도
   , x varchar(50) -- x좌표
   , y varchar(50) -- y좌표
   , dutyweekendat varchar(3) -- 주말진료여부
)

-- drop table phamarcy;

-- delete from phamarcy;

select * from phamarcy;

insert into phamarcy(
   num, dutyaddr, dutyname, dutytel1
   ,dutytime1c ,dutytime2c, dutytime3c, dutytime4c, dutytime5c, dutytime6c, dutytime7c, dutytime8c, dutytime1s, dutytime2s, dutytime3s, dutytime4s, dutytime5s, dutytime6s, dutytime7s, dutytime8s
   ,hpid ,postcdn1 ,postcdn2 ,lon ,lat ,x ,y ,dutyweekendat)
 values('47','서울특별시 강남구 봉은사로 471 (삼성동)','희영온누리약국',	'02-547-1950'
,'1830','1830','1830','1830','1830','1500','1300','1300','0900','0900','0900','0900','0900','0900','0900','0900'
,'C1107032','060','95','127.051239538093','37.5127262745682','14143279.29003474','4510817.234371158','Y')

