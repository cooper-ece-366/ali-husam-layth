package edu.cooper.ece366.project.server.Components;

public class restaurant {
    private String photo; 
    private String name; 
    private String rating; 
    private String vicinity; 
    private String website;
    

    //Getters and setters
    public void setPhoto(String photo){
        this.photo = photo;
    }
    public String getPhoto(){
        return this.photo;
    }
    
    public void setName(String name){
        this.name = name;
    }
    public String getName(){
        return this.name;
    }

    public void setRating(String rating){
        this.rating = rating;
    }
    public String getRating(){
        return this.rating;
    }
    
    public void setVicinity(String vicinity){
        this.vicinity = vicinity;
    }
    public String getVicinity(){
        return this.vicinity;
    }

    public void setWebsite(String website){
        this.website = website;
    }
    public String getWebsite(){
        return this.website;
    }


}
