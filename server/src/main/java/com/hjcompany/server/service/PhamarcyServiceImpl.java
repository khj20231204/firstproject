package com.hjcompany.server.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hjcompany.server.dto.Pharm;
import com.hjcompany.server.mapper.PhamarcyMapper;

@Service
public class PhamarcyServiceImpl implements PhamarcyService {

   @Autowired
   private PhamarcyMapper phamarcyMapper;

   @Override
   public int savePharmDatas(List<Map<String, Object>> pharmData) {
      return phamarcyMapper.savePharmDatas(pharmData);
   }

   @Override
   public int savePharmDataList(List<Pharm> pharmData) {
     return phamarcyMapper.savePharmDataList(pharmData);
   }
   
}
