-- Active: 1729210488806@@127.0.0.1@3306@membersdb

-- USER_AUTH : 권한 테이블
DROP TABLE IF EXISTS USER_AUTH;

CREATE TABLE USER_AUTH(
	auth_no INT NOT NULL auto_increment PRIMARY KEY   -- 권한 번호
   , user_id VARCHAR(100) NOT NULL                   -- 아이디
   , auth VARCHAR(100) NOT NULL                         -- 권한(USER, ADMIN)
   , FOREIGN key(user_id) references user(user_id) ON DELETE CASCADE
);

SELECT * FROM user_auth;

DROP table user_auth;
-- 사용자 권한 : USER
insert into user_auth(user_id, auth) values('user','USER');

-- 관리자 권한 : USER, ADMIN
insert into user_auth(user_id, auth) values('admin','USER');
insert into user_auth(user_id, auth) values('admin','ADMIN');








DELETE FROM user_auth;