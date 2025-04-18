package com.movie.Moviebackend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;


import java.sql.Date;
import java.util.List;

@SpringBootApplication
public class MoviebackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(MoviebackendApplication.class, args);
    }

   
}
