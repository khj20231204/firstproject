package com.hjcompany.server.dto;

import java.sql.Timestamp;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("comment")
public class Comment {
   private int comment_num;
   private int re_num;
	private int re_lev;
	private int re_step;
   private String content;
   private String user_id;
   private Timestamp reg_date;
}
