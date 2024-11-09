package com.hjcompany.server.dto;

import java.util.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("board")
public class Board {
   private int num;
	private String writer;
	private String subject;
	private String content;
	private String email;
	private int readcount;
	private String passwd;
	private int ref;
	private int re_step;
	private int re_level;
	private String ip;
	private Date reg_date;
	private String del;

	// page
	private int startRow;
	private int endRow;
	
	// 검색
	private String search;
	private String keyword;
}
