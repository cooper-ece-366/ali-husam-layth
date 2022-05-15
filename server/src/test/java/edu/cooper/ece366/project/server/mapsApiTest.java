// Ali Ghuman - testng class for mapsApi.java class

package edu.cooper.ece366.project.server;

import java.io.IOException;

import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import edu.cooper.ece366.project.server.Components.mapsApi;
import org.springframework.beans.factory.annotation.Value;

public class mapsApiTest {
	public static final String MAPS_KEYWORD_TEST = "halal";
	public static final String MAPS_URL_TEST = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=";
	public static final String MAPS_API_TEST = "AIzaSyDgJRYms334dF4NCHF8FcDx1b_iF_UEWUI";
	public static final String MAPS_TYPE_TEST = "restaurant";
	public static final String MAPS_LAT_TEST = "40";
	public static final String MAPS_LNG_TEST = "-74";
	public static final String MAPS_NEXTPAGE_TEST = "next";
	public static final String MAPS_DETAILS_TEST = "https://maps.googleapis.com/maps/api/place/details/json?key=";
	private mapsApi maps;

	@BeforeClass
	public void testSetUp() {
		System.out.println("Setting up mapsAPI test");
		this.maps= new mapsApi(MAPS_KEYWORD_TEST, MAPS_API_TEST, MAPS_TYPE_TEST, MAPS_LAT_TEST, MAPS_LNG_TEST, MAPS_URL_TEST, MAPS_DETAILS_TEST);
		System.out.println("mapsAPI test setup complete.");
	}

	@Test
	public void verifyGetItems() throws IOException {
		System.out.println("Running mapsAPI test.verifyGetItems()");
		Assert.assertNotNull(maps.getItems());
		System.out.println("Finished mapsAPI test.verifyGetItems()");
	}

	@AfterClass
	public void tearDown() {
		System.out.println("Completing mapsAPI test");
		this.maps = (mapsApi) null;
		System.out.println("Exiting mapsAPI test");
	}
}