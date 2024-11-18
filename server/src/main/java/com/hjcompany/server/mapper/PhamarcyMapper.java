package com.hjcompany.server.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.hjcompany.server.dto.Pharm;

@Mapper
public interface PhamarcyMapper {

   int savePharmDatas(List<Map<String, Object>> pharmData);

   int savePharmDataList(List<Pharm> pharmData);

   List<Pharm> getData();
}
