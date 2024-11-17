package com.hjcompany.server.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hjcompany.server.dto.Pharm;
import com.hjcompany.server.service.ExamService;
import com.hjcompany.server.service.PhamarcyService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/pharm")
public class PhamarcyController {

   @Autowired
   private PhamarcyService phamarcyService;

   @Autowired
   private ExamService examService;

   @PostMapping("/savePharmDatas")
   public  ResponseEntity<String> savePharmDatas(@RequestBody List<Map<String,Object>> pharmData) {

      //System.out.println(pharmData);

      /*{NUM={_text=1}, DUTYADDR={_text=대전광역시 동구 계족로 362, 성남약국 1층 (성남동)}, DUTYETC={_text=null},  DUTYWEEKENDAT={_text=N}}    
      {NUM={_text=2}, DUTYADDR={_text=경기도 화성시 동탄신리천로1길 73, 103호 (산척동)}, ...
      */ 

      //pharmDataOriginal.size() = 2
      for(int i=0 ; i<pharmData.size() ; i++){
         Map<String, Object> map = pharmData.get(i);

         map.put("NUM", splitMap(map.get("NUM"),"NUM"));
         map.put("DUTYADDR", splitMap(map.get("DUTYADDR"),""));
         map.put("DUTYNAME", splitMap(map.get("DUTYNAME"),""));
         map.put("DUTYTEL1", splitMap(map.get("DUTYTEL1"),""));
         map.put("DUTYTIME1C", splitMap(map.get("DUTYTIME1C"),""));
         map.put("DUTYTIME2C", splitMap(map.get("DUTYTIME2C"),""));
         map.put("DUTYTIME3C", splitMap(map.get("DUTYTIME3C"),""));
         map.put("DUTYTIME4C", splitMap(map.get("DUTYTIME4C"),""));
         map.put("DUTYTIME5C", splitMap(map.get("DUTYTIME5C"),""));
         map.put("DUTYTIME6C", splitMap(map.get("DUTYTIME6C"),""));
         map.put("DUTYTIME7C", splitMap(map.get("DUTYTIME7C"),""));
         map.put("DUTYTIME8C", splitMap(map.get("DUTYTIME8C"),""));
         map.put("DUTYTIME1S", splitMap(map.get("DUTYTIME1S"),""));
         map.put("DUTYTIME2S", splitMap(map.get("DUTYTIME2S"),""));
         map.put("DUTYTIME3S", splitMap(map.get("DUTYTIME3S"),""));
         map.put("DUTYTIME4S", splitMap(map.get("DUTYTIME4S"),""));
         map.put("DUTYTIME5S", splitMap(map.get("DUTYTIME5S"),""));
         map.put("DUTYTIME6S", splitMap(map.get("DUTYTIME6S"),""));
         map.put("DUTYTIME7S", splitMap(map.get("DUTYTIME7S"),""));
         map.put("DUTYTIME8S", splitMap(map.get("DUTYTIME8S"),""));
         map.put("HPID", splitMap(map.get("HPID"),""));
         map.put("POSTCDN1", splitMap(map.get("POSTCDN1"),""));
         map.put("POSTCDN2", splitMap(map.get("POSTCDN2"),""));
         map.put("LON", splitMap(map.get("LON"),""));
         map.put("LAT", splitMap(map.get("LAT"),""));
         map.put("X", splitMap(map.get("X"),""));
         map.put("Y", splitMap(map.get("Y"),""));
         map.put("DUTYWEEKENDAT", splitMap(map.get("DUTYWEEKENDAT"),""));
         
      }

      System.out.println(pharmData);
      int result = phamarcyService.savePharmDatas(pharmData);
      //int result = examService.saveData(pharmData);

     return new ResponseEntity<>("OK", HttpStatus.OK);
   }

   <T> T splitMap(Object obj, String key){

      String str = String.valueOf(obj);
      str = str.substring(7, str.length());
      str = str.substring(0,str.length()-1);
      System.out.println("결과:"+str);

      if(key.equals("NUM"))
         return (T)Integer.valueOf(str);

      return (T)str;
   }

   @PostMapping("/savePharmDataList")
   //public  ResponseEntity<String> savePharmDataList(@RequestBody List<Pharm> pharmData) {

   public  ResponseEntity<String> savePharmDataList(@RequestBody Pharm pharmData) {

      System.out.println(pharmData);

      //int result = phamarcyService.savePharmDatas(pharmData);
      //int result = phamarcyService.savePharmDataList(pharmData);

      //int result = examService.saveData(pharmData);

     return new ResponseEntity<>("OK", HttpStatus.OK);
   }
}
