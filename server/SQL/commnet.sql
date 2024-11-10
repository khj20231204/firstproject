
select * from board;

create table comment(
   comment_num int AUTO_INCREMENT PRIMARY key
   , re_num int default 1
	, re_lev int default 1 -- 같은 묶음 안에서 순서
	, re_step int default 1 -- 들여쓰기
   , content varchar(300) not null
   , user_id varchar(30) not null
   , reg_date TIMESTAMP default current_timestamp
   , FOREIGN Key (re_num) REFERENCES board(num)
   , FOREIGN key(user_id) REFERENCES board(user_id)
)

-- drop table comment;

 delete from comment;

select * from comment;
-- commnet_num 순으로 order by 한다 : 항상 최신 글이 위에
-- 1. 글 작성시 원글의 num을 가져온다
-- 2. 원글의 댓글은 전부 re_num으로 묶인다

2. 원글 2 (num=2)
   1. 댓글 (re_num=2, re_lev=1, re_step=1)
      1. 대댓글 (re_num=2, re_lev=1, re_step=2)
   2. 댓글 (re_num=2, re_lev=2, re_step=1)

1. 원글 1 (num=1)
   1. 댓글 (re_num=1, re_lev=1, re_step=1)
      1. 대댓글 (re_num=1, re_lev=1, re_step=2)
         1. 대대댓글 (re_num=1, re_lev=1, re_step=3)
   2. 댓글 2 (re_num=1, re_lev=2, re_step=1)
   3. 댓글 1 (re_num=1, re_lev=3, re_step=1)
      3. 댓글 1 (re_num=1, re_lev=3, re_step=2)

re_num : 한 글에 대해 전부 같은 re_num을 가져오기 때문에 순서는 무의미   
re_lev : asc
re_step : asc

-- 원글에 대한 댓글 : 댓글은 숫자로 순서를 표시한다.
insert into comment(re_num, re_lev, re_step, content, user_id) 
values('부모num','같은 re_rum 중 가장 큰 ref_lev+1', 1)

-- 댓글에 대한 대댓글 : 대댓글은 들여쓰기로 순서를 표시한다.
insert into comment(re_num, re_lev, re_step, content, user_id) 
values('부모re_num','부모 re_num','같은 re_lev 중 가장 큰 re_step+1')

-- 원글3에 대한 댓글 예제
-- 원글3에 대한 댓글 1
insert into comment(re_num, re_lev, re_step, content, user_id) 
select 3
   ,ifnull((select max(ifnull(re_lev,0))+1 from comment where re_num = 3),1)
   , 1
   , '댓글1'
   , 'user3';

-- 원글3에 대한 댓글 2
insert into comment(re_num, re_lev, re_step, content, user_id) 
select 3
   ,ifnull((select max(ifnull(re_lev,0))+1 from comment where re_num = 3),1)
   , 1
   , '댓글2'
   , 'user1';

-- mapper
insert into comment(re_num, re_lev, re_step, content, user_id) 
select #{num}
   ,ifnull((select max(ifnull(re_lev,0))+1 from comment where re_num = #{num}),1)
   , 1 -- 댓글에 대한 re_step은 1고정
   , '댓글2'
   , 'user2';


-- 원글3에 대한 댓글2 에 대한 대댓글 예제
-- 댓글2에 대한 대댓글 1
insert into comment(re_num, re_lev, re_step, content, user_id) 
select 3
, 2
, ifnull((select max(ifnull(re_step,0))+1 from comment where re_lev=2 and re_num=3),1)
, '원글3의 댓글2 대한 대댓글1'
, 'user1';

-- 댓글2에 대한 대댓글 2
insert into comment(re_num, re_lev, re_step, content, user_id) 
select 3
, 2
, ifnull((select max(ifnull(re_step,0))+1 from comment where re_lev=2 and re_num=3),1)
, '원글3의 댓글2 대한 대댓글2'
, 'user3';

-- 원글3에 대한 댓글1 에 대한 대댓글 예제
-- 댓글1에 대한 대댓글 1
insert into comment(re_num, re_lev, re_step, content, user_id) 
select 3
, 1
, ifnull((select max(ifnull(re_step,0))+1 from comment where re_lev=1 and re_num=3),1)
, '원글3의 댓글1 대한 대댓글2'
, 'user2';

-- mapper
insert into comment(re_num, re_lev, re_step, content, user_id) 
select #{mum}
, #{re_lev}
, ifnull((select max(ifnull(re_step,0))+1 from comment where re_lev=#{re_lev} and re_num=#{re_num}),1)
, '2에대한 대댓글2'
, 'user1';

-- 댓글은 전부 re_num 안에서 같은 re_lev 끼리의 관계이기 때문에 comment_num을 사용할 일이 없다.

-- 정렬

select * from comment where re_num = 3 order by re_lev asc, re_step asc;