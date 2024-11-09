-- Active: 1731150471586@@127.0.0.1@3306@membersdb
create user hjcompany@'%' identified by 'hjpass';  
grant all privileges on membersdb.* to hjcompany@'%' with grant option;  
flush privileges;  

create database membersdb;

create table board(
	num int AUTO_INCREMENT PRIMARY key
	, user_id varchar(30) not null 
	, subject varchar(100) not null
	, content varchar(4000) not null
   , readcount int 
	, reg_date TIMESTAMP default current_timestamp 
   , del varchar(10) default 'N'
   -- page
   , startRow int 
   , endRow int
   -- search
   , search varchar(100)
   , keyword varchar(100)
   , FOREIGN key(user_id) REFERENCES user(user_id)
);

drop table board;

select * from board;

insert into board(num, user_id, subject, content, email, readcount)
	values(1, 'hjcompany', '화창한 봄날', '솟아오르는 잠자리 떼','hj@email.com' , 0);
    
select * from board order by num desc limit 1,100;

select * from board where subject like concat('%','200','%') order by num desc;	#검색 가능


insert into board(user_id, subject, content) 
values('hjcompany602', '화창한 봄날602', '솟아오르는 잠자리 떼');


insert into board(num, user_id, subject, content, email, readcount) 
values((SELECT ifnull(MAX(b.num),0)+1 AS num from board b), 'hjcompany602', '화창한 봄날602', '솟아오르는 잠자리 떼','hj@email.com' , 0);

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
        <if test="condition=='user_id'">
        where user_id
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
        <if test="condition=='user_id'">
        where user_id
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
        insert into board(num, user_id, subject, content, email, readcount) values(ifnull(max(num),0)+i, concat('hjcompany',i), concat('화창한 봄날', 100+i), '솟아오르는 잠자리 떼','hj@email.com' , 0);
    end while;
END

-- 프로시저 실횅
call new_procedure2; -- 프로시저에서 구문 에러가 나면  Invalid use of group function가 뜬다

-- 프로시저 내용 보기
show create procedure new_procedure2;


COMMIT;