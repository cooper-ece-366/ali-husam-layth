package edu.cooper.ece366.project.server.Components;

import java.io.IOException;
import java.io.InputStream;

import org.jsoup.Jsoup;
import org.springframework.boot.context.properties.ConfigurationProperties;


@ConfigurationProperties(prefix = "google")
public class mapsApi {
    // Get current location or given location


    String keyword;
    String url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=";
    String google_api;
    String type;
    String lat;
    String lng;


    public mapsApi(String keyword, String google_api, String type, String lat, String lng){
        this.keyword = keyword;
        this.google_api = google_api;
        this.type = type;
        System.out.println(lat+lng);
        this.lat = lat;
        this.lng = lng;
    }



    public String getItems() throws IOException {
//        System.out.println("Google Api: " + this.google_api);
        this.url = this.url + this.keyword + "&location=" + this.lat + "," + this.lng + "&radius=20000&type=" + this.type + "&key=" + this.google_api;

        String doc = Jsoup.connect(url).ignoreContentType(true).execute().body();
        System.out.println("Connected to Google Maps API - returning results...");

        return doc;
    }
}

