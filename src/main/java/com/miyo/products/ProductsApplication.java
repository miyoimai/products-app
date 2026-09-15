package com.miyo.products;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ProductsApplication {

	public static void main(String[] args) {
		System.out.println("DB_PASSWORD env: '" + System.getenv("DB_PASSWORD") + "'");
		System.out.println("spring.datasource.password system property: '" + System.getProperty("spring.datasource.password") + "'");
		SpringApplication.run(ProductsApplication.class, args);
	}

}
