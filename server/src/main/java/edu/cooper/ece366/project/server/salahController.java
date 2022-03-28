package edu.cooper.ece366.project.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class salahController {
    private static final Logger LOGGER = LoggerFactory.getLogger(Server.class);
    @CrossOrigin
    @GetMapping(path = "/api/prayerinfo", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getSalah() throws IOException {
        final salahScraper test = new salahScraper();
        LOGGER.info("Accessed Athan website for webscraping");
        return test.items;
    }
}
