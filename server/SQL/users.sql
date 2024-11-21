-- active: 1731407083250@@firstproject.ch2m8mqmk43c.ap-northeast-2.rds.amazonaws.com@3306@firstproject

-- user: 회원 테이블
create table `user` (
`user_id` varchar(100) not null
, `user_pw` varchar(200) not null
, `name` varchar(100) null
, `email` varchar (200) not null
, `reg_date` timestamp not null default current_timestamp
, `upd_date` timestamp not null default current_timestamp
, `enabled` int default 1
, `no` int not null
, primary key (`user_id`)
);

drop table user;

delete from user;

select * from user;

-- bcryptpasswordencoder : 암호화 시
-- 사용자
insert into user (user_id, user_pw, name, email, no )
values ('user', '$2a$12$trn..kcvjciciz.5vj96yobljevttgj9aukmtfbgpgc9hmc7bxq92', '사용자', 'user@mail.com',(select ifnull(max(b.no),0)+1 as num from user b) );


-- 관리자
insert into user (user_id, user_pw, name, email, no )
values ('admin', '$2a$12$trn..kcvjciciz.5vj96yobljevttgj9aukmtfbgpgc9hmc7bxq92', '관리자', 'admin@mail.com',(select ifnull(max(b.no),0)+1 as num from user b) );


insert into user(user_id,user_pw,name,email,no) values('userid2','1234','name','email',(select ifnull(max(b.no),0)+1 as num from user b));
