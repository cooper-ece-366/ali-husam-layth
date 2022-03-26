package edu.cooper.ece366.project.server.Controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import edu.cooper.ece366.project.server.Components.Message;

@RestController
public class messageController {
//    private static final Logger LOGGER = LoggerFactory.getLogger(ControllerApi.class);

    @CrossOrigin
    @GetMapping(path = "/api/message", produces = MediaType.APPLICATION_JSON_VALUE)
    public Message getMessage() {

        final Message message = new Message();
        message.setText("Testing");
        return message;
    }
}