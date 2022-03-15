package edu.cooper.ece366.project.server;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class restaurantController {
    @CrossOrigin
    @GetMapping(path = "/api/restaurants", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getRestaurants() throws IOException {
        final restaurantScraper test = new restaurantScraper();
        return "{'see:' 'terminal'}";
    }
}
