// Author: Layth Yassin - this class interacts with the IslamicFinder API to obtain information 
// on salah times and qiblah direction

package edu.cooper.ece366.project.server.Components;

import org.json.JSONArray;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.springframework.boot.context.properties.ConfigurationProperties;
import java.io.IOException;

@ConfigurationProperties(prefix = "google")
public class salahScraper {
    String lat;
    String lng;
    String google_api;
    String url; 

    public salahScraper(String lat, String lng, String google_api, String url) throws IOException {
        this.lat = lat;
        this.lng = lng;
        this.google_api = google_api;
        this.url = url;
    }

    // obtain zip code and country code given latitude and longitude coordinates for use in IslamicFinder api
    public String coordsToAddr(String lat, String lng) throws IOException {
        String zipCode = "";
        String countryCode = "";

        // use geocode api to obtain JSON containing addresses near the latitude and longitude coordinates
        String url = this.url + lat + "," + lng + "&key=" + this.google_api;
        String doc = Jsoup.connect(url).ignoreContentType(true).execute().body();
        JSONObject jsonObj = new JSONObject(doc);
        JSONArray results = jsonObj.getJSONArray("results");

        // extract the zip code and country code of one of the addresses near the coordinates
        for (int i = 0; i < results.length(); i++) {
            if (!(zipCode.isEmpty()) && !(countryCode.isEmpty())) {
                break;
            }
            else if (results.getJSONObject(i).has("address_components")) {
                JSONArray addressComponents = results.getJSONObject(i).getJSONArray("address_components");
                for (int j = 0; j < addressComponents.length(); j++) {
                    JSONObject obj = addressComponents.getJSONObject(j);
                    if (obj.has("types")) {
                        JSONArray types = obj.getJSONArray("types");
                        for (int k = 0; k < types.length(); k++) {
                            if (types.get(k).equals("postal_code")) {
                                zipCode = (String) (obj.get("short_name"));
                            }
                            else if (types.get(k).equals("country")) {
                                countryCode = (String) (obj.get("short_name"));
                            }
                        }
                    }
                }
            }
        }
        return zipCode + " " + countryCode;
    }

    // getter to return api results
    public String getItems() throws IOException {
        // convert coordinates to zip code and country code
        String tmp = coordsToAddr(this.lat, this.lng);
        String[] addrInfo = tmp.split(" ");
        String zipCode = addrInfo[0];
        String countryCode = addrInfo[1];

        // use zip code and country code as input to the IslamicFinder api call to obtain prayer times
        String url = "https://www.islamicfinder.us/index.php/api/prayer_times?country=" + countryCode + "&zipcode=" + zipCode;
        String doc = Jsoup.connect(url).ignoreContentType(true).execute().body();
        System.out.println("Connected to IslamicFinder API - returning results...");

        return doc;
    }
}
