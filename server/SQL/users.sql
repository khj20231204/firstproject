-- Active: 1729210488806@@127.0.0.1@3306@membersdb

-- user: 회원 테이블
DROP TABLE IF EXISTS USER;

create table user(
	user_id varchar(30) PRIMARY key,
   user_pw varchar(300) not null,
	name varchar(30),
	email varchar(30),
	reg_date timestamp default current_timestamp,
	upd_date timestamp default current_timestamp,
	enabled int default 1
);
drop table user;

select * from user;

INSERT INTO user (user_id, user_pw, name, email )
VALUES ('user', '$2a$12$TrN..KcVjciciz.5Vj96YOBljeVTTGJ9AUKmtfbGpgc9hmC7BXQ92', '사용자', 'user@mail.com' );

-- 관리자
INSERT INTO user (user_id, user_pw, name, email )
VALUES ('admin', '$2a$12$TrN..KcVjciCiz.5Vj96YOBljeVTTGJ9AUKmtfbGpgc9hmC7BXQ92', '관리자', 'admin@mail.com' );


INSERT INTO user( user_id, user_pw, name, email ) VALUES ( 'user1', '$2a$12$g83EyNzxlRC/wS/V1ion2OXG7a9fy5BTCwUA7nCzCMHmi5N3KQ/Ze', '길동 군' ,'kildong@goole.com' );
INSERT INTO user( user_id, user_pw, name, email ) VALUES ( 'user2', '$2a$12$g83EyNzxlRC/wS/V1ion2OXG7a9fy5BTCwUA7nCzCMHmi5N3KQ/Ze', '순신 군' ,'kildong@goole.com' );
INSERT INTO user( user_id, user_pw, name, email ) VALUES ( 'user3', '$2a$12$g83EyNzxlRC/wS/V1ion2OXG7a9fy5BTCwUA7nCzCMHmi5N3KQ/Ze', '겅남 군' ,'kildong@goole.com' );

select * from user;
delete from user where no in (23,24);

SELECT 
	  ,u.user_id
	  ,user_pw
	  ,name
	  ,email
	  ,enabled
	  ,reg_date
	  ,upd_date
	  ,auth
FROM user u LEFT OUTER JOIN user_auth auth 
			ON u.user_id = auth.user_id
WHERE u.user_id = 'user';

-- BCryptPasswordEncoder : 암호화 시
-- 사용자
