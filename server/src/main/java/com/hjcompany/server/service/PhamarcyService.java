package com.hjcompany.server.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.hjcompany.server.dto.Pharm;

@Service
public interface PhamarcyService {

   int savePharmDatas(List<Map<String,Object>> pharmData);

   int savePharmDataList(List<Pharm> pharmData);

   List<Pharm> getData();
<<<<<<< HEAD
=======
   
>>>>>>> 9168ad4addf2d17b52c6c5a329bc4e8b12f65a4f
}
