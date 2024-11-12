
create table comment(
   comment_num int AUTO_INCREMENT PRIMARY key
   , re_num int default 1
	, re_lev int default 1 -- 같은 묶음 안에서 순서
	, re_step int default 1 -- 들여쓰기
   , content varchar(300) not null
   , user_id varchar(30) not null
   , reg_date TIMESTAMP default current_timestamp
   , del varchar(10) default 'N'
   , FOREIGN Key (re_num) REFERENCES board(num)
   , FOREIGN key(user_id) REFERENCES user(user_id)
)

drop table comment;

delete from comment;

commit;

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

--------------------- 원글에 대한 댓글 -------------------------------
-- 댓글은 숫자로 순서를 표시한다.
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
   , #{content}
   , #{userId};


--------------------- 댓글에 대한 대댓글 -------------------------------

-- 업데이트 먼저 시키고 --
update comment set re_lev = re_lev+1 where re_lev > #{re_lev} and re_num = #{re_num};
update comment set re_lev = re_lev+1 where re_lev > 1 and re_num = 2;
-- insert --
-- 원글에 대한 댓글에서 re_lev와 re_step은 전부 1로 셋팅된다
insert into comment(re_num, re_lev, re_step, content, user_id) 
select #{re_mum}
, ifnull(#{re_lev},0)+1 -- 부모에 re_lev가 되고 자신은 re_lev+1
, ifnull(#{re_step},0)+1
, #{content}
, #{userId};

re_lev : 1 2 3 4 가 있을 때 2에 댓글을 달면 자신은 3이되고 기존의 3 4 은 4 5이 된다

select * from comment where re_num = #{re_num} order by re_lev asc;

re_num 1 , re_lev 1 , re_step 1
re_num 1 , re_lev 2 , re_step 1
re_num 1 , re_lev 3 , re_step 1

re_lev 2에 댓글을 단다 : 자신이 들어갈 re_lev보다 큰 re_lev 전부 1씩 증가
re_num 1 , re_lev 1 , re_step 1
re_num 1 , re_lev 2 , re_step 1
=> re_num 1 , re_lev 3 , re_step 2
re_num 1 , re_lev 4 , re_step 1  

정렬은 re_lev로 하는데 들여쓰기로 구분


update comment set re_lev = re_lev-1 where re_lev <![CDATA[ > ]]> #{re_lev} and re_num = #{re_num}

update comment set del='Y' where comment_num=#{comment_num}