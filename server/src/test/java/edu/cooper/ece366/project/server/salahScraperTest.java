package edu.cooper.ece366.project.server;

import java.io.IOException;

import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import edu.cooper.ece366.project.server.Components.salahScraper;

//Ali worked on this class
public class salahScraperTest {
	public static final String MESSAGE_TEXT_TEST = "test";
	public static final String MESSAGE_TEXT_TEST_2 = "test2";
	private salahScraper scraper;


	@BeforeClass
	public void testSetUp() throws IOException {
		System.out.println("Setting up salahScraper test");
		this.scraper = new salahScraper();
		System.out.println("salahScraper test setup complete.");
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
