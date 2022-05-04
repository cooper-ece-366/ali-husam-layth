package edu.cooper.ece366.project.server.Components;

import java.io.IOException;
import java.io.InputStream;
import org.json.JSONObject;  
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

    public mapsApi(String keyword, String google_api, String type, String lat, String lng, String url){
        this.keyword = keyword;
        this.google_api = google_api;
        this.type = type;
        System.out.println(lat+lng);
        this.lat = lat;
        this.lng = lng;
        this.url = url; 
    }



    public String getItems() throws IOException {
        //System.out.println("Google Api: " + this.google_api);
        this.url = this.url + this.keyword + "&location=" + this.lat + "," + this.lng + "&radius=20000&type=" + this.type + "&key=" + this.google_api;
        
        String doc = Jsoup.connect(url).ignoreContentType(true).execute().body();
        System.out.println("Connected to Google Maps API - returning results...");

        return doc;
    }

    public String getNext(String nextPage) throws IOException{
        System.out.println(nextPage);
        this.url = this.url + "1" + "&key=" + this.google_api + "&pagetoken=" + nextPage;
        // System.out.println(this.url);
        String doc = Jsoup.connect(this.url).ignoreContentType(true).execute().body();
        System.out.println("Connected to Google Maps API - returning results...");
        System.out.println(this.url);
        System.out.println(doc);
        return doc;
    }
}

