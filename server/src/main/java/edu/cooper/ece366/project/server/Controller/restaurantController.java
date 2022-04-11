package edu.cooper.ece366.project.server.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import edu.cooper.ece366.project.server.Server;
import edu.cooper.ece366.project.server.Components.mapsApi;

import java.io.IOException;

@RestController
public class restaurantController {
    private static final Logger LOGGER = LoggerFactory.getLogger(Server.class);

    @Value("${google.api}")
    private String google_api;

    @Value("${google.url}")
    private String url;

    @CrossOrigin
    @GetMapping(path = "/api/restaurants", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getRestaurants(@RequestParam String lat, @RequestParam String lng) throws IOException {
        final mapsApi test = new mapsApi("halal", this.google_api, "restaurant", lat, lng, this.url);
        LOGGER.info("Connected to Google Places API");
        return test.getItems();
    }
}
