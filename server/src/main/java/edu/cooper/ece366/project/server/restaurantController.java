package edu.cooper.ece366.project.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class restaurantController {
    private static final Logger LOGGER = LoggerFactory.getLogger(Server.class);
    @CrossOrigin
    @GetMapping(path = "/api/restaurants", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getRestaurants() throws IOException {
        final restaurantScraper test = new restaurantScraper();
        LOGGER.info("Connected to Google Places API");
        return test.items;
    }
}
