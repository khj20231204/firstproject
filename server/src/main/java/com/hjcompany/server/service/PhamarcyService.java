package com.hjcompany.server.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.hjcompany.server.dto.Pharm;

@Service
public interface PhamarcyService {

   int savePharmDatas(List<Map<String,Object>> pharmData);

   int savePharmDataList(List<Pharm> pharmData);
   
}
