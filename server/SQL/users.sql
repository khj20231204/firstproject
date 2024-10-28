-- Active: 1729210488806@@127.0.0.1@3306@membersdb

-- user: 회원 테이블
CREATE TABLE `user` (
`NO` int NOT NULL AUTO_INCREMENT,
`USER_ID` varchar(100) NOT NULL,
`USER_PW` varchar(200) NOT NULL,
`NAME` varchar(100) NOT NULL,
`EMAIL` varchar (200) DEFAULT NULL,
`REG_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
`UPD_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
`ENABLED` int DEFAULT 1,
PRIMARY KEY (`NO`)
) COMMENT='';

-- BCryptPasswordEncoder : 암호화 시
-- 사용자
INSERT INTO user (user_id, user_pw, name, email )
VALUES ('user', '$2a$12$TrN..KcVjciciz.5Vj96YOBljeVTTGJ9AUKmtfbGpgc9hmC7BXQ92', '사용자', 'user@mail.com' );

DELETE FROM USER;

-- 관리자
INSERT INTO user (user_id, user_pw, name, email )
VALUES ('admin', '$2a$12$TrN..KcVjciCiz.5Vj96YOBljeVTTGJ9AUKmtfbGpgc9hmC7BXQ92', '관리자', 'admin@mail.com' );

SELECT * FROM `user`;

DELETE FROM USER;