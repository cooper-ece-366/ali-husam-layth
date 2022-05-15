// Husam Almanakly - this page is used to gather extraneous info for each item queried from a 
// google maps API call. Things like operational hours and extra photos are obtained and sent
// back to the controller to send to the MVC

// Ali Ghuman edited and added to this class

package edu.cooper.ece366.project.server.Components;
import java.io.IOException;
import java.io.InputStream;
import org.json.JSONObject;  
import org.jsoup.Jsoup;
import org.springframework.boot.context.properties.ConfigurationProperties;

public class links {
    public String placeId;
    public String url;    
    String google_api; 

    String site;
    JSONObject hours; 

    public links(String placeId, String url, String api){
        this.placeId = placeId;
        this.url = url;
        this.google_api = api; 
    }

    // Function to fetch the website and hours attributes from details API
    public void getItems() throws IOException {

        //Set up url to connect to the google place details API
        this.url = this.url + this.google_api + "&place_id=" + this.placeId + "&fields=website,opening_hours";
        String doc = Jsoup.connect(url).ignoreContentType(true).execute().body();
        JSONObject jo = new JSONObject(doc);
        
        String site;
        JSONObject hours; 
        try{
            site = jo.getJSONObject("result").getString("website");
        }
        catch(Exception e){
            site = "undefined";
        }
        try{
            hours = jo.getJSONObject("result").getJSONObject("opening_hours");
        }
        catch(Exception e){
            hours = new JSONObject("{'Undefined': 'Undefined'}");
        }

        this.hours = hours;
        this.site = site; 
        // System.out.println(site); 
    }
    

    // getters to return the hours and website attributes
    public JSONObject getHours() throws IOException {
        return this.hours;
    }

    public String getSite() throws IOException {
        return this.site;
    }
    
}


