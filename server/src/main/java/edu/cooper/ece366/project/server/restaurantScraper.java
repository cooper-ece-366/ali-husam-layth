package edu.cooper.ece366.project.server;

import java.io.IOException;
import java.util.Scanner;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;


public class restaurantScraper {
    restaurant[] items;
    // Get current location or given location
    public restaurantScraper() throws IOException {

        String keyword = "halal+food+near+me";
        String url = "https://www.google.com/search?q=" + keyword;

        System.out.println("\n"+url);
        System.out.println("Starting URL");

        Document doc = Jsoup.connect(url).get();
        Elements links = doc.select("a[href]");

        for (Element link : links) {

            System.out.println("\nLink : " + link.attr("href"));
            System.out.println("Text : " + link.text());
        }
    }
}
