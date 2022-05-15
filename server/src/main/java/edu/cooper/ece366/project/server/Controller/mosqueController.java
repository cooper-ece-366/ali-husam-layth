// Husam Almanakly and Ali Ghuman - class that implements a spring boot controller for the mosques page
// interacts with google maps API and uses the mapsApi.java class in order to retrieve results

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
public class mosqueController {
    private static final Logger LOGGER = LoggerFactory.getLogger(Server.class);

    // Import values from config file
    @Value("${google.api}")
    private String google_api;

    @Value("${google.url}")
    private String url; 

    @Value("${google.details}")
    private String details;

    //Api endpoint to retrieve mosques in the area 
    @CrossOrigin
    @GetMapping(path = "/api/mosques", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('USER')")
    public String getMosques(@RequestParam String lat, @RequestParam String lng, @RequestParam(required = false) String nextPage) throws IOException {
        final mapsApi test = new mapsApi("mosque", this.google_api, "mosque", lat, lng, this.url, this.details);
        LOGGER.info("Connected to Google Places API");
        
        System.out.println(lat + lng + nextPage);

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
