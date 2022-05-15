// Husam Almanakly - this class implements a spring boot controller class for the restaurants
// page. This page interacts with the google places api using the mapsApi.java (and links.java) class

package edu.cooper.ece366.project.server.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import edu.cooper.ece366.project.server.Server;
import edu.cooper.ece366.project.server.Components.mapsApi;

import java.io.IOException;

@RestController
public class restaurantController {
    private static final Logger LOGGER = LoggerFactory.getLogger(Server.class);

    //Import configuration variables
    @Value("${google.api}")
    private String google_api;

    @Value("${google.url}")
    private String url;

    @Value("${google.details}")
    private String details;


    //Api endpoint to retrieve restaurants
    @CrossOrigin
    @GetMapping(path = "/api/restaurants", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('USER')")
    public String getRestaurants(@RequestParam String lat, @RequestParam String lng, @RequestParam(required = false) String nextPage) throws IOException {
        // final mapsApi test = new mapsApi("(halal) OR (kosher)", this.google_api, "restaurant", lat, lng, this.url, details);
        final mapsApi test = new mapsApi("halal", this.google_api, "restaurant", lat, lng, this.url, details);

        System.out.println(nextPage);
        if(nextPage != null){
            LOGGER.info("Returning next 20 results...");
            return test.getNext(nextPage);
        }
        else{
            LOGGER.info("Connected to Google Places API");
            return test.getItems();
        }
    }
}
