package com.hjcompany.server.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public interface ExamService {

   int saveData(List<Map<String,Object>> pharmData);
   
}
