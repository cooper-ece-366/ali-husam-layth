package edu.cooper.ece366.project.server;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@SpringBootApplication
public class Server {
    private static final Logger LOGGER = LoggerFactory.getLogger(Server.class);

    public static final void main(final String[] args) {
        LOGGER.info("Starting application...");
        SpringApplication.run(Server.class, args);
//        System.out.println("The server says hello!");
        LOGGER.info("Running RestApiServer.");
    }
}
