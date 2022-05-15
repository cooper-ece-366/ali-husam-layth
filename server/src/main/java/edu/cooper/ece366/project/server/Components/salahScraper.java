// Layth Yassin - this class interacts with the IslamicFinder API to obtain information 
// on salah times and qiblah direction

package edu.cooper.ece366.project.server.Components;

import org.json.JSONArray;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import java.io.IOException;

public class salahScraper {
    String items;

    // Constructor that makes the api call and assigns results to a class variable
    public salahScraper() throws IOException {
        String url = "https://www.islamicfinder.us/index.php/api/prayer_times?country=US&zipcode=11209";

        String doc = Jsoup.connect(url).ignoreContentType(true).execute().body();
        System.out.println("Connected to IslamicFinder API - returning results...");

        this.items = doc;
    }

    // getter to return api results
    public String getItems() { return this.items; }

}