package com.hjcompany.server.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ExamMapper {

   int saveData(List<Map<String, Object>> pharmData);
}
