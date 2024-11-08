-- Active: 1729210488806@@127.0.0.1@3306@membersdb
create user hjcompany@'%' identified by 'hjpass';  
grant all privileges on membersdb.* to hjcompany@'%' with grant option;  
flush privileges;  

create database membersdb;

--  -------------시큐리티 회원가입 ----------------------------------------- 
-- ------------------- 권한

-- 기존 데이블이 존재하면 삭제
DROP TABLE IF EXISTS USER_AUTH;

create table user_auth(
	user_id varchar(30),
    auth varchar(30)
);
drop table user_auth;

-- 사용자 권한 : USER
insert into user_auth(user_id, auth) values('user','USER');

-- 관리자 권한 : USER, ADMIN
insert into user_auth(user_id, auth) values('admin','USER');
insert into user_auth(user_id, auth) values('admin','ADMIN');

-- ---------------------- 사용자
-- 기존 데이블이 존재하면 삭제
DROP TABLE IF EXISTS USER;

create table user(
	no int auto_increment primary key,
	user_id varchar(30),
   user_pw varchar(300),
	name varchar(30),
	email varchar(30),
	reg_date timestamp default current_timestamp,
	upd_date timestamp default current_timestamp,
	enabled int default 1
);
drop table user;

INSERT INTO user( user_id, user_pw, name, email ) VALUES ( 'user', '$2a$12$g83EyNzxlRC/wS/V1ion2OXG7a9fy5BTCwUA7nCzCMHmi5N3KQ/Ze', '길동 군' ,'kildong@goole.com' );
INSERT INTO user( user_id, user_pw, name, email ) VALUES ( 'user2', '$2a$12$g83EyNzxlRC/wS/V1ion2OXG7a9fy5BTCwUA7nCzCMHmi5N3KQ/Ze', '순신 군' ,'kildong@goole.com' );
INSERT INTO user( user_id, user_pw, name, email ) VALUES ( 'user3', '$2a$12$g83EyNzxlRC/wS/V1ion2OXG7a9fy5BTCwUA7nCzCMHmi5N3KQ/Ze', '겅남 군' ,'kildong@goole.com' );

select * from user;
delete from user where no in (23,24);

SELECT u.no
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

-- ------------- 게시판 --------------------------------------- --

create table board(
	num int
	, writer varchar(100) not null
	, subject varchar(100) not null
	, content varchar(4000) not null
   /*  , email varchar(300) */
	#, passwd varchar(100) not null -- 로그인한 상태에서 글을 작성하기 때문에 passwd는 없어도 될 것 같다
    , readcount int 
    
/* 	, re_ref int -- 같은 묶음
	, re_lev int -- 같은 묶음 안에서 순서
	, re_step int -- 들여쓰기 */
	
	, reg_date TIMESTAMP default current_timestamp 
    
    , del varchar(10) default 'Y'
    
    , startRow int 
    , endRow int
    
    , search varchar(100)
    , keyword varchar(100)
);

drop table board;

insert into board(num, writer, subject, content, email, readcount,  re_ref, re_lev, re_step)
	values(1, 'hjcompany', '화창한 봄날', '날아다니는 똥파리','hj@email.com' , 0, 0, 0, 0);
    
delete from board;

select * from board;

select * from board where num=3;

select * from board order by num desc limit 1,100;

select * from board where subject like '%봄날2%' order by num desc limit 1, 100; 	
select * from board where subject like '%봄날20%' order by num desc limit 1, 100; 	
select * from board where subject like '%봄날200%' order by num desc limit 1, 100; 	

select * from board where content like '%자리 떼%' order by num desc limit 1, 1000;	#검색 가능
# like 검색은 전체 문서에서 mysql이 하는 거고 그 결과값을 limit로 제한한다.

select * from board where subject like concat('%','200','%') order by num desc;	#검색 가능


delete from board where num in (604, 603, 602);

update board set del='N';

update board set content='날아다니는 솟아오르는 잠자리 떼';

call new_procedure2;

insert into board(num, writer, subject, content, email, readcount,  re_ref, re_lev, re_step) 
values((SELECT ifnull(MAX(b.num),0)+1 AS num from board b), 'hjcompany602', '화창한 봄날602', '날아다니는 똥파리','hj@email.com' , 0, 0, 0, 0);

select max(num) from board;
select ifnull(max(num),0)+1 from board;
select concat('hjcompany',1) from board;
select concat('화창한 봄날','100') from board;

select 2+3 from board;  	-- 결과값 : 5
select sum(2+3) from board;  -- 결과값:3010
select sum(2,3) from board;  -- Error Code : 1064

select * from (select a.*,rowNum rn from (
			select * from board
		<where>
			<if test="keyword != null and search!='subcon'">
				${search} like '%'||#{keyword}||'%'
			</if>
			<if test="keyword != null and search=='subcon'">
				subject like '%'||#{keyword}||'%' or
				content like '%'||#{keyword}||'%'
			</if>
		</where>			
			 order by ref desc,re_step) a )
			where rn between #{startRow} and #{endRow}

-- ---------------------------------------------------------------- 페이지
select * from board limit 4,5; #목록 갯수 4부터 5개를 가져와라

/*
한페이지에 보여줄 목록수 : 10개
page 1 : 1,10 : select * from board limit 0,10;
page 2 : 10,10 : select * from board limit 10,10;
page 3 : 20,10 : select * from board limit 20,10;
*/

select * from board limit 10 offset 0;
select * from board limit 0,10;

select * from board limit 10 offset 10;
select * from board limit 10,10;

select * from board limit 10 offset 20;
select * from board limit 20,10;

select * from board limit (page-1)*10, 10;

-- 댓글에 따라 정렬해서 목록가져오기
select * from board order by board_re_ref desc, board_re_seq asc limit 0, 10;
select * from board order by board_re_ref desc, board_re_seq asc limit 600, 10;

-- ---------------------------------------------------------------- Mapper : 검색 기능이 포함된 전체 게시물 조회
<select id="getAllArticles" resultMap="BoardMap">
        select *
        from board
        <if test="condition=='title'">
        where title
        like concat('%',#{keyword},'%')
        </if>
        <if test="condition=='writer'">
        where writer
        like concat('%',#{keyword},'%')
        </if>
        <if test="condition=='content'">
        where title
        like concat('%',#{keyword},'%')
        </if>
        <if test="condition=='titleContent'">
        where title
        like concat('%',#{keyword},'%')
        or content
        like concat('%',#{keyword},'%')
        </if>
        limit #{startPage},#{countPerPage}
</select>

-- ---------------------------------------------------------------- Mapper : 검색 기능이 포함된 전체 게시물 전체 count가져오기

<select id="countArticles" resultType="int">
        select count(*)
        from board
        <if test="condition=='title'">
        where title
        like concat('%',#{keyword},'%')
        </if>
        <if test="condition=='writer'">
        where writer
        like concat('%',#{keyword},'%')
        </if>
        <if test="condition=='content'">
        where title
        like concat('%',#{keyword},'%')
        </if>
        <if test="condition=='titleContent'">
        where title
        like concat('%',#{keyword},'%')
        or content
        like concat('%',#{keyword},'%')
        </if>
</select>

/* -------------------------------------------------------------- 프로시져 ----------------------------------------- */

CREATE PROCEDURE `new_procedure2`()
BEGIN
	declare i int default 0;
    while i<=600 do
		set i = i+1;
        insert into board(num, writer, subject, content, email, readcount,  re_ref, re_lev, re_step) values(ifnull(max(num),0)+i, concat('hjcompany',i), concat('화창한 봄날', 100+i), '날아다니는 똥파리','hj@email.com' , 0, 0, 0, 0);
    end while;
END

-- 프로시저 실횅
call new_procedure2; -- 프로시저에서 구문 에러가 나면  Invalid use of group function가 뜬다

-- 프로시저 내용 보기
show create procedure new_procedure2;


COMMIT;