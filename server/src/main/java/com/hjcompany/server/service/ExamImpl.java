package com.hjcompany.server.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hjcompany.server.mapper.ExamMapper;

@Service
public class ExamImpl implements ExamService{

   @Autowired
   private ExamMapper examMapper;

   @Override
   public int saveData(List<Map<String, Object>> pharmData) {
      return examMapper.saveData(pharmData);
   }
}
