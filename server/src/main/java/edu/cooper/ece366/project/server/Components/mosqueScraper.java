package edu.cooper.ece366.project.server.Components;

import java.io.IOException;
import java.util.Scanner;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class mosqueScraper {
    String items;
    // Get current location or given location

    public mosqueScraper() throws IOException {

        String keyword = "mosque";
        String key = "API Key";

        String url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=" + keyword + "&location=40.894810,-74.534020&radius=15000&type=mosque&key=" + key;

//        System.out.println("\n"+url);
//        System.out.println("Starting URL");

        String doc = Jsoup.connect(url).ignoreContentType(true).execute().body();
        System.out.println("Connected to Google Maps API - returning results...");

        this.items = doc;
    }
}

