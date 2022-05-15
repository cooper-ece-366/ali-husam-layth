// Husam Almanakly - test file for API Endpoint testing 

package edu.cooper.ece366.project.server.Controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import edu.cooper.ece366.project.server.Components.Message;

@RestController
@CrossOrigin
@RequestMapping(value = "/api")
public class messageController {
//    private static final Logger LOGGER = LoggerFactory.getLogger(ControllerApi.class);

    @GetMapping(path = "/message", produces = MediaType.APPLICATION_JSON_VALUE)
    public Message getMessage() {

        final Message message = new Message("hello");
        message.setText("Testing");
        return message;
    }
}