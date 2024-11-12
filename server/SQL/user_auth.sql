-- Active: 1731399781134@@hjcompany.ch2m8mqmk43c.ap-northeast-2.rds.amazonaws.com@3306@firstproject

-- USER_AUTH : 권한 테이블

CREATE TABLE USER_AUTH(
	AUTH_NO INT NOT NULL auto_increment PRIMARY KEY   -- 권한 번호
   , USER_ID VARCHAR(100) NOT NULL                     -- 아이디
   , AUTH VARCHAR(100) NOT NULL                         -- 권한(USER, ADMIN)
   , FOREIGN KEY(USER_ID) REFERENCES user(USER_ID)
);

-- DROP TABLE USER_AUTH;

SELECT * FROM USER_AUTH;

-- 사용자 권한 : USER
INSERT INTO USER_AUTH(USER_ID, AUTH) VALUES('USER', 'ROLE_USER');

-- 관리자 권한 : USER, ADMIN
INSERT INTO USER_AUTH(USER_ID, AUTH) VALUES('ADMIN', 'ROLE_ADMIN');
INSERT INTO USER_AUTH(USER_ID, AUTH) VALUES('ADMIN', 'ROLE_USER');

SELECT * FROM user_auth;







DELETE FROM user_auth;