-- active: 1731407083250@@firstproject.ch2m8mqmk43c.ap-northeast-2.rds.amazonaws.com@3306@firstproject

-- user_auth : 권한 테이블

create table user_auth(
	auth_no int not null auto_increment primary key   -- 권한 번호
   , user_id varchar(100) not null                     -- 아이디
   , auth varchar(100) not null                         -- 권한(user, admin)
   , foreign key(user_id) references user(user_id)
);

drop table user_auth;

select * from user_auth;

-- 사용자 권한 : user
insert into user_auth(user_id, auth) values('user', 'role_user');

-- 관리자 권한 : user, admin
insert into user_auth(user_id, auth) values('admin', 'role_admin');
insert into user_auth(user_id, auth) values('admin', 'role_user');

select * from user_auth;

select database();
show tables;

commit;

select database();
show tables;

delete from user_auth;