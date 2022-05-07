package com.elte.kolhok;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EntityScan("com.elte.kolhok")
@EnableMongoRepositories("com.elte.kolhok.mongo.repository")
public class KolhokApplication {

	public static void main(String[] args) {
		SpringApplication.run(KolhokApplication.class, args);
	}

}
