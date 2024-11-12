-- active: 1731407083250@@firstproject.ch2m8mqmk43c.ap-northeast-2.rds.amazonaws.com@3306@firstproject

show databases; -- 전체 데이터베이스 목록
create database firstproject;
use firstproject;

select database(); -- 현재 사용중인 데이터베이스
show tables; -- 현재 데이터베이스에 있는 테이블 목록


show variables like 'lower_case_table_names';
0 : 구분한다
1 : 구분하지 않는다

aws rds > 대시보드 > 파라미터 그룹 > 기본값 탭
default.mysql8.0 선택
