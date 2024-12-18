package com.hjcompany.server.dto;

import java.sql.Timestamp;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("board")
public class Board {
   private int num;
	private String userId;
	private String subject;
	private String content;
	private int readcount;
	private Timestamp regDate;
	private String del;

	// page
	private int startRow;
	private int endRow;
	
	// 검색
	private String search;
	private String keyword;
}
