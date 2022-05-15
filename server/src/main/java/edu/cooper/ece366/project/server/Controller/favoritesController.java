// Husam Almanakly - this class implements a favorite page spring boot controller.
// This class 'directs traffic' to the provided api links and uses the favorites and place.java classes
// in order to obtain and store the data provided from the user (in addition to deleting items)

package edu.cooper.ece366.project.server.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import edu.cooper.ece366.project.server.Server;
import edu.cooper.ece366.project.server.Components.favorited;
import edu.cooper.ece366.project.server.Components.place;
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

    //Set up mapping to send data to for items to be persisted in the mysql database
    @PostMapping("/api/saveFav")
    @PreAuthorize("hasRole('USER')")
    public favorited addItem(@CurrentUser UserPrincipal userPrincipal, @Valid @RequestBody place restaurant) {
        
        int userID = ((Long)userPrincipal.getId()).intValue();
        favorited fav = new favorited();

        //Set user ID to match logged in users
        fav.setUserID(userID);
        
        //Converting the Object to JSONString
        ObjectMapper mapper = new ObjectMapper();
        String jsonString;
        try{
            jsonString = mapper.writeValueAsString(restaurant);
        }
        catch(Exception e){
            System.out.println("Exception Caught");
            return fav;
        }
        
        System.out.println("Data Received: " + jsonString);
        fav.setPlace(jsonString);
        fav.setName(restaurant.getName()); 
        try{
            favoritesRepository.save(fav);
            LOGGER.info("Successfully saved data...");
        } 
        catch(Exception e){
            LOGGER.info("Requested place is already in the database!");
        }

        return fav;
    }

    //API endpoint to query the database for stored items
    @GetMapping("/api/getFav")
    @PreAuthorize("hasRole('USER')")
    public String getRestaurants(@CurrentUser UserPrincipal userPrincipal) {
        int userID = ((Long)userPrincipal.getId()).intValue();

        //Obtain all the items saved by the given user
        List<favorited> tmp = favoritesRepository.findByUserID(userID);

        // Parse items and return formatted
        JSONArray restaurants = new JSONArray();
        for(favorited item : tmp){
            JSONObject jo = new JSONObject(item.getPlace());
            jo.put("id", item.getId());
            // jo.put("favorited", true);
            restaurants.put(jo);
        }
        return restaurants.toString();
    }

    //Remove favorited item (id provided) for given user
    @GetMapping("/api/removeFav")
    @PreAuthorize("hasRole('USER')")
    public favorited removeFav(@CurrentUser UserPrincipal userPrincipal, @RequestParam int id) {

        int userID = ((Long)userPrincipal.getId()).intValue();

        //Query database for all saved items
        List<favorited> tmp = favoritesRepository.findByUserID(userID);

        //Find the item with matching id and remove from the database
        for(favorited item : tmp){
            if(item.getId() == id){
                favoritesRepository.delete(item);
                return item; 
            }
        }

        return new favorited();
    }
}