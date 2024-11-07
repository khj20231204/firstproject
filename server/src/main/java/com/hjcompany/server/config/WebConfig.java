package com.hjcompany.server.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
   
   @Override
   public void addCorsMappings(CorsRegistry registry) {
      registry.addMapping("/**") // react의 3000번 포트 허용
      .allowedOrigins("http://localhost:3000") 
      .allowedMethods("GET", "POST", "PUT","DELETE")
      .allowedHeaders("*")
      .maxAge(3600);
      }
   }
