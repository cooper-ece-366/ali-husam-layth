// Ali Ghuman - testng class for place.java component

package edu.cooper.ece366.project.server;

import java.io.IOException;

import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import edu.cooper.ece366.project.server.Components.place;

//Ali worked on this class
public class placeTest {
	public static final String PLACE_TEST = "test";
	private place place;


	@BeforeClass
	public void testSetUp() throws IOException {
		System.out.println("Setting up place test");
		this.place = new place();
		System.out.println("place test setup complete.");
	}


	@Test
	public void verifysetPhoto() throws IOException {
		System.out.println("Running place test.verifysetPhoto()");
		place.setPhoto(PLACE_TEST);
		Assert.assertEquals(place.getPhoto(), PLACE_TEST);
		System.out.println("Finished place test.verifysetPhoto()");
	}

	@Test
	public void verifysetName() throws IOException {
		System.out.println("Running place test.verifysetName()");
		place.setName(PLACE_TEST);
		Assert.assertEquals(place.getName(), PLACE_TEST);
		System.out.println("Finished place test.verifysetName()");
	}

	@Test
	public void verifysetRating() throws IOException {
		System.out.println("Running place test.verifysetRating()");
		place.setRating(PLACE_TEST);
		Assert.assertEquals(place.getRating(), PLACE_TEST);
		System.out.println("Finished place test.verifysetRating()");
	}

	@Test
	public void verifysetVicinity() throws IOException {
		System.out.println("Running place test.verifysetVicinity()");
		place.setVicinity(PLACE_TEST);
		Assert.assertEquals(place.getVicinity(), PLACE_TEST);
		System.out.println("Finished place test.verifysetVicinity()");
	}

	@Test
	public void verifysetWebsite() throws IOException {
		System.out.println("Running place test.verifysetWebsite()");
		place.setWebsite(PLACE_TEST);
		Assert.assertEquals(place.getWebsite(), PLACE_TEST);
		System.out.println("Finished place test.verifysetWebsite()");
	}

	@AfterClass
	public void tearDown() {
		System.out.println("Completing place test");
		this.place = (place) null;
		System.out.println("Exiting place test");
	}
}
