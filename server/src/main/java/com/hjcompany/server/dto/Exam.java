package com.hjcompany.server.dto;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("exam")
public class Exam {
 
   private String name;
   private int age;
}
