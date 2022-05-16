// Ali Ghuman - testng class for salahScraper.java component

package edu.cooper.ece366.project.server;

import java.io.IOException;

import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import edu.cooper.ece366.project.server.Components.salahScraper;

//Ali worked on this class
public class salahScraperTest {
	public static final String SALAH_URL_TEST = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
	public static final String SALAH_API_TEST = "AIzaSyDgJRYms334dF4NCHF8FcDx1b_iF_UEWUI";
	public static final String SALAH_LAT_TEST = "40";
	public static final String SALAH_LNG_TEST = "-74";
	private salahScraper scraper;


	@BeforeClass
	public void testSetUp() throws IOException {
		System.out.println("Setting up salahScraper test");
		this.scraper = new salahScraper(SALAH_LAT_TEST, SALAH_LNG_TEST, SALAH_API_TEST, SALAH_URL_TEST);
		System.out.println("salahScraper test setup complete.");
	}


	@Test
	public void verifycoordsToAddr() throws IOException {
		System.out.println("Running salahScraper test.verifycoordsToAddr()");
		Assert.assertNotNull(scraper.coordsToAddr(SALAH_LAT_TEST, SALAH_LNG_TEST));
		System.out.println("Finished salahScraper test.verifycoordsToAddr()");
	}

	@Test
	public void verifygetItems() throws IOException {
		System.out.println("Running salahScraper test.verifyGetItems()");
		Assert.assertNotNull(scraper.getItems());
		System.out.println("Finished salahScraper test.verifyGetItems()");
	}

	@AfterClass
	public void tearDown() {
		System.out.println("Completing salahScraper test");
		this.scraper = (salahScraper) null;
		System.out.println("Exiting salahScraper test");
	}
}
