package edu.cooper.ece366.project.server.Components;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Table(name = "favorited", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"userID", "name"})
})
public class favorited {
    // Fields

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private int userID;

    @Column 
    private String name; 

    @Column(length = 1000)
    private String place;

    public favorited(){
    }
    
    //Setters and Getters
    public void setId(Long id){
        this.id = id; 
    }

    public Long getId(){
        return this.id; 
    }

    public void setPlace(String place){
        this.place = place;
    }

    public String getPlace(){
        return this.place;
    }

    public void setUserID(int userID){
        this.userID = userID;
    }

    public int getUserID(){
        return this.userID;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getName(){
        return this.name;
    }
}
