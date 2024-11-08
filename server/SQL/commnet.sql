
select * from board;

create table comment(
   comment_num int AUTO_INCREMENT PRIMARY key
   , re_ref int Foreign Key (board) REFERENCES (num)
	, re_lev int -- 같은 묶음 안에서 순서
	, re_step int -- 들여쓰기
   , content varchar(300) not null
   , user_id varchar(30) FOREIGN key(user) REFERENCES(user_id)
)

insert into comment(re_ref, ref_lev, re_step, content, del) values(3, )


