package com.hjcompany.server.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class MapController {
   
   @RequestMapping(value="mapsearch2", method=RequestMethod.GET)
   public String requestMethodName(@RequestParam String param) {

      System.out.println("mapsearch");

       return "map";
   }
   
}
