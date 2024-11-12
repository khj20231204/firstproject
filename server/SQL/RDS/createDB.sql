-- Active: 1731399781134@@hjcompany.ch2m8mqmk43c.ap-northeast-2.rds.amazonaws.com@3306@firstproject

create database firstproject;
create user hjcompany@'%' identified by 'hjpass';  
grant all privileges on firstproject.* to hjcompany@'%' with grant option;  
flush privileges;  

#create database membersdb;

계정 생성 후 연결 안됨