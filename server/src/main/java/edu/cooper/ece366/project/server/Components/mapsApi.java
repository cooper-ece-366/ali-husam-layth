package edu.cooper.ece366.project.server.Components;

import java.io.IOException;
import java.io.InputStream;
import org.json.JSONObject;
import org.json.JSONArray;  
import org.jsoup.Jsoup;
import org.springframework.boot.context.properties.ConfigurationProperties;


@ConfigurationProperties(prefix = "google")
public class mapsApi {
    // Get current location or given location


    String keyword;
    String url;
    String google_api;
    String type;
    String lat;
    String lng;
    String nextPage; 
    String details;

    public mapsApi(String keyword, String google_api, String type, String lat, String lng, String url, String details){
        this.keyword = keyword;
        this.google_api = google_api;
        this.type = type;
        System.out.println(lat+lng);
        this.lat = lat;
        this.lng = lng;
        this.url = url;
        this.details = details; 
    }

    public JSONArray getLinks(JSONArray keys) throws IOException{
        for(int i=0; i<keys.length(); i++){
            String key = (keys.getJSONObject(i)).getString("place_id"); // Here's your key
            // System.out.println(key);
            links test = new links(key, this.details, this.google_api);
            test.getItems();
            String link = test.getSite();
            JSONObject hours = test.getHours(); 
    
            keys.getJSONObject(i).put("website", link);
            keys.getJSONObject(i).put("hours", hours);
            // System.out.println(keys.getJSONObject(i).getString("website"));
        }
        return keys;
    }


    public String getItems() throws IOException {
        //System.out.println("Google Api: " + this.google_api);
        this.url = this.url + this.keyword + "&location=" + this.lat + "," + this.lng + "&radius=20000&type=" + this.type + "&key=" + this.google_api;

        String doc = Jsoup.connect(url).ignoreContentType(true).execute().body();
        JSONObject jo = new JSONObject(doc);
        JSONArray keys = jo.getJSONArray("results");
        JSONArray updated = this.getLinks(keys);
        jo.put("results", updated);
        System.out.println("Connected to Google Maps API - returning results...");

        return jo.toString();
    }

    public String getNext(String nextPage) throws IOException{
        // System.out.println(nextPage);
        this.url = this.url + "1" + "&key=" + this.google_api + "&pagetoken=" + nextPage;
        String doc = Jsoup.connect(this.url).ignoreContentType(true).execute().body();
        JSONObject jo = new JSONObject(doc);
        JSONArray keys = jo.getJSONArray("results");
        JSONArray updated = this.getLinks(keys);
        jo.put("results", updated);
        System.out.println("Collecting  - returning results...");
        return jo.toString();
    }
}

