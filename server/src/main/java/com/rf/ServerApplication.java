package com.rf;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.security.crypto.password.StandardPasswordEncoder;

@Configuration
@ComponentScan
@EnableAutoConfiguration
@ImportResource("classpath:config.xml")
public class ServerApplication {

	public static void main(String[] args) throws Exception {
		SpringApplication.run(ServerApplication.class, args);
		
		org.springframework.security.crypto.password.StandardPasswordEncoder standard = new StandardPasswordEncoder("MyPasswordTokenChangeMe");
		System.out.println(standard.encode("123456"));
	}

}