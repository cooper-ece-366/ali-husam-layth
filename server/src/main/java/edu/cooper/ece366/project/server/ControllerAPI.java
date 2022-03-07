package edu.cooper.ece366.project.server;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.naming.ldap.Control;
import java.io.IOException;

@RestController
@RequestMapping(path = "/api") //used to map web requests to spring controller methods
public class ControllerAPI {

    @GetMapping(path = "/message", params = {"name"})
    public Message getMessage(
            @RequestParam final String name) {

        final Message message = new Message();
        message.setText("Hello " + name);
        return message;
    }
}