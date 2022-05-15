package edu.cooper.ece366.project.server.Components;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Table(name = "favoriteRestaurants", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"userID", "restaurant"})
})
public class favoriteRestaurants {
    // Fields

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private int userID;

    @Column
    private String restaurant;

    public favoriteRestaurants(){
    }
    
    //Setters and Getters
    public void setId(Long id){
        this.id = id; 
    }

    public Long getId(){
        return this.id; 
    }

    public void setRestaurant(String restaurant){
        this.restaurant = restaurant;
    }

    public String getRestaurant(){
        return this.restaurant;
    }

    public void setUserID(int userID){
        this.userID = userID;
    }

    public int getUserID(){
        return this.userID;
    }


}
