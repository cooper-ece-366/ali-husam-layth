// Author: Layth Yassin - this page implements a spring boot controller for the prayer info
// page. This interacts with the IslamicFinder api using the salahScraper.java class

package edu.cooper.ece366.project.server.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RestController;
import edu.cooper.ece366.project.server.Server;
import edu.cooper.ece366.project.server.Components.salahScraper;
import java.io.IOException;

@RestController
public class salahController {
    private static final Logger LOGGER = LoggerFactory.getLogger(Server.class);

    @Value("${google.api}")
    private String google_api;

    @Value("${google.geocode}")
    private String google_geocode;

    // call salahScraper to obtain prayer times
    @CrossOrigin
    @GetMapping(path = "/api/prayerinfo", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('USER')")
    public String getSalah(@RequestParam String lat, @RequestParam String lng) throws IOException {
        final salahScraper test = new salahScraper(lat, lng, this.google_api, this.google_geocode);
        LOGGER.info("Connected to IslamicFinder API");
        return test.getItems();
    }
}