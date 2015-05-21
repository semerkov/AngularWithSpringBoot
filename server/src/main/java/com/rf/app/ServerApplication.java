package com.rf.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan("com.rf.*")
@EnableAutoConfiguration
public class ServerApplication {

	public static void main(String[] args) throws Exception {
		SpringApplication.run(ServerApplication.class, args);
	}

}
