package edu.cooper.ece366.project.server.Components;
import java.io.IOException;
import java.io.InputStream;
import org.json.JSONObject;  
import org.jsoup.Jsoup;
import org.springframework.boot.context.properties.ConfigurationProperties;

public class links {
    String placeId;
    String url;    
    String google_api; 

    String site;
    JSONObject hours; 

    public links(String placeId, String url, String api){
        this.placeId = placeId;
        this.url = url;
        this.google_api = api; 
    }

    public void getItems() throws IOException {
        //System.out.println("Google Api: " + this.google_api);
        this.url = this.url + this.google_api + "&place_id=" + this.placeId + "&fields=website,opening_hours";
        // System.out.println(this.url);
        String doc = Jsoup.connect(url).ignoreContentType(true).execute().body();
        JSONObject jo = new JSONObject(doc);
        // System.out.println("Connected to Place Details API - returning results");
        // System.out.println(jo);

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
    
    public JSONObject getHours() throws IOException {
        return this.hours;
    }

    public String getSite() throws IOException {
        return this.site;
    }
    
}


