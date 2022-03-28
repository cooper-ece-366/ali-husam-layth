package edu.cooper.ece366.project.server;

import org.json.JSONArray;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import java.io.IOException;


public class salahScraper {
    String items;

    public salahScraper() throws IOException {
        String url = "https://www.islamicfinder.org/world/united-states/5128581/new-york-city-nyc-prayer-times/";

        Document doc = Jsoup.connect(url).get();
        Element timeEl = doc.getElementById("prayertimes-card");

        String fajr = timeEl.getElementsByClass("prayerTiles fajar-tile").get(0).text();
        String fajrTime = fajr.split("\\s+")[1] + " " + fajr.split("\\s+")[2];
        String sunrise = timeEl.getElementsByClass("prayerTiles sunrise-tile").get(0).text();
        String sunriseTime = sunrise.split("\\s+")[1] + " " + sunrise.split("\\s+")[2];
        String dhuhr = timeEl.getElementsByClass("prayerTiles dhuhar-tile").get(0).text();
        String dhuhrTime = dhuhr.split("\\s+")[1] + " " + dhuhr.split("\\s+")[2];
        String asr = timeEl.getElementsByClass("prayerTiles asr-tile").get(0).text();
        String asrTime = asr.split("\\s+")[1] + " " + asr.split("\\s+")[2];
        String maghrib = timeEl.getElementsByClass("prayerTiles maghrib-tile").get(0).text();
        String maghribTime = maghrib.split("\\s+")[1] + " " + maghrib.split("\\s+")[2];
        String isha = timeEl.getElementsByClass("prayerTiles isha-tile").get(0).text();
        String ishaTime = isha.split("\\s+")[1] + " " + isha.split("\\s+")[2];

        JSONObject jsonTimes = new JSONObject();
        jsonTimes.put("fajr", fajrTime);
        jsonTimes.put("sunrise", sunriseTime);
        jsonTimes.put("dhuhr", dhuhrTime);
        jsonTimes.put("asr", asrTime);
        jsonTimes.put("maghrib", maghribTime);
        jsonTimes.put("isha", ishaTime);

//        Element calEl = doc.getElementById("hijriMonth");

//        System.out.println(calEl);

        this.items = jsonTimes.toString();
    }
}
