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

    public links(String placeId, String url, String api){
        this.placeId = placeId;
        this.url = url;
        this.google_api = api; 
    }

    public String getItems() throws IOException {
        //System.out.println("Google Api: " + this.google_api);
        this.url = this.url + this.google_api + "&place_id=" + this.placeId + "&fields=website";
        // System.out.println(this.url);
        String doc = Jsoup.connect(url).ignoreContentType(true).execute().body();
        JSONObject jo = new JSONObject(doc);
        System.out.println("Connected to Place Details API - returning results");
        // System.out.println(jo);

        String site; 
        try{
            site = jo.getJSONObject("result").getString("website");
        }
        catch(Exception e){
            site = "undefined";
        }
        // System.out.println(site); 
        return site;
    }
    
}
