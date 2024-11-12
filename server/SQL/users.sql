-- Active: 1731399781134@@hjcompany.ch2m8mqmk43c.ap-northeast-2.rds.amazonaws.com@3306@firstproject

-- user: 회원 테이블
CREATE TABLE `user` (
`USER_ID` varchar(100) NOT NULL
, `USER_PW` varchar(200) NOT NULL
, `NAME` varchar(100) NULL
, `EMAIL` varchar (200) NOT NULL
, `REG_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
, `UPD_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
, `ENABLED` int DEFAULT 1
, `NO` int NOT NULL
, PRIMARY KEY (`USER_ID`)
);

-- drop table user;

SELECT * FROM user;

-- BCryptPasswordEncoder : 암호화 시
-- 사용자
INSERT INTO user (user_id, user_pw, name, email, no )
VALUES ('user', '$2a$12$TrN..KcVjciciz.5Vj96YOBljeVTTGJ9AUKmtfbGpgc9hmC7BXQ92', '사용자', 'user@mail.com',(SELECT ifnull(MAX(b.no),0)+1 AS num from user b) );


-- 관리자
INSERT INTO user (user_id, user_pw, name, email, no )
VALUES ('admin', '$2a$12$TrN..KcVjciCiz.5Vj96YOBljeVTTGJ9AUKmtfbGpgc9hmC7BXQ92', '관리자', 'admin@mail.com',(SELECT ifnull(MAX(b.no),0)+1 AS num from user b) );


insert into user(USER_ID,USER_PW,NAME,EMAIL,no) values('userid2','1234','name','email',(SELECT ifnull(MAX(b.no),0)+1 AS num from user b));
