package com.hjcompany.server.dto;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("pharm")
public class Pharm {
   private int pharmnum; //pk
   private int NUM; //일련번호
   private String dutyaddr; //주소
   private String dutyetc; //비고
   private String dutyinf; //기관설명상세
   private String dutymapimg; //간이약도
   private String dutyname; //기관명
   private String dutytel1; //대표전화
   private String dutytime1c; //월요일
   private String dutytime2c; //화요일
   private String dutytime3c; //수요일
   private String dutytime4c; //목요일
   private String dutytime5c; //금요일
   private String dutytime6c; //토요일
   private String dutytime7c; //일요일
   private String dutytime8c; //공휴일
   private String dutytime1s; //월요일
   private String dutytime2s; //화요일
   private String dutytime3s; //수요일
   private String dutytime4s; //목요일
   private String dutytime5s; //금요일
   private String dutytime6s; //토요일
   private String dutytime7s; //일요일
   private String dutytime8s; //공휴일
   private String hpid; //기관id
   private String postcdn1; //우편번호1
   private String postcdn2; //우편번호2
   private String lon; //경도
   private String lat; //위도
   private String x; //x좌표
   private String y; //y좌표
   private String dutyweekendat; //주말진료여부
}