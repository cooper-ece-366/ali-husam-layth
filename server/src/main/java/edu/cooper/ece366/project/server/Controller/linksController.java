package edu.cooper.ece366.project.server.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import edu.cooper.ece366.project.server.Server;
import edu.cooper.ece366.project.server.Components.links;
import java.io.IOException;


@RestController
public class linksController {
    private static final Logger LOGGER = LoggerFactory.getLogger(Server.class);

    @Value("${google.api}")
    private String google_api;

    @Value("${google.details}")
    private String url;
    
    @CrossOrigin
    @GetMapping(path = "/api/links")
    public String getMosques(@RequestParam String placeId) throws IOException {
        
        System.out.println(placeId);
        final links test = new links(placeId, this.url, this.google_api);
        
        LOGGER.info("Collecting website links...");
        return test.getItems();
    }
    
}
