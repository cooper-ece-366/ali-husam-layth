package edu.cooper.ece366.project.server.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import edu.cooper.ece366.project.server.Server;
import edu.cooper.ece366.project.server.Components.favoriteRestaurants;
import edu.cooper.ece366.project.server.Components.restaurant;
import edu.cooper.ece366.project.server.security.CurrentUser;
import edu.cooper.ece366.project.server.repository.FavoritesRepository;
import edu.cooper.ece366.project.server.repository.UserRepository;
import edu.cooper.ece366.project.server.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import com.fasterxml.jackson.databind.ObjectMapper;
import javax.validation.Valid;
import java.io.IOException;
import org.json.JSONObject;
import org.json.JSONArray;  
import java.util.ArrayList;
import java.util.List;

@RestController
public class favoritesController {
    
    private static final Logger LOGGER = LoggerFactory.getLogger(Server.class);

    //Import all tables
    @Autowired
    private FavoritesRepository favoritesRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/api/saveFav")
    @PreAuthorize("hasRole('USER')")
    public favoriteRestaurants addRestaurant(@CurrentUser UserPrincipal userPrincipal, @Valid @RequestBody restaurant place) {
        
        int userID = ((Long)userPrincipal.getId()).intValue();
        favoriteRestaurants fav = new favoriteRestaurants();

        System.out.println(userID);
        
        fav.setUserID(userID);
        
        //Converting the Object to JSONString
        ObjectMapper mapper = new ObjectMapper();
        String jsonString;
        try{
            jsonString = mapper.writeValueAsString(place);
        }
        catch(Exception e){
            System.out.println("Exception Caught");
            return fav;
        }

        fav.setRestaurant(jsonString);
        try{
            favoritesRepository.save(fav);
            LOGGER.info("Successfully saved data...");
        } 
        catch(Exception e){
            LOGGER.info("Requested place is already in the database!");
        }

        return fav;
    }

    @GetMapping("/api/getFav")
    @PreAuthorize("hasRole('USER')")
    public String getRestaurants(@CurrentUser UserPrincipal userPrincipal) {
        int userID = ((Long)userPrincipal.getId()).intValue();
        List<favoriteRestaurants> tmp = favoritesRepository.findByUserID(userID);

        JSONArray restaurants = new JSONArray();
        for(favoriteRestaurants item : tmp){
            JSONObject jo = new JSONObject(item.getRestaurant());
            jo.put("id", item.getId());
            restaurants.put(jo);
        }
        return restaurants.toString();
    }

    //Remove favorited item (id provided) for given user
    @GetMapping("/api/removeFav")
    @PreAuthorize("hasRole('USER')")
    public favoriteRestaurants removeFav(@CurrentUser UserPrincipal userPrincipal, @RequestParam int id) {

        int userID = ((Long)userPrincipal.getId()).intValue();
        List<favoriteRestaurants> tmp = favoritesRepository.findByUserID(userID);

        for(favoriteRestaurants item : tmp){
            if(item.getId() == id){
                favoritesRepository.delete(item);
                return item; 
            }
        }

        return new favoriteRestaurants();
    }
}