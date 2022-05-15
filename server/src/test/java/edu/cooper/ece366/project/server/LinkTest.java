// Ali Ghuman - Test class for links.java using testng

package edu.cooper.ece366.project.server;

import java.io.IOException;

import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import edu.cooper.ece366.project.server.Components.links;

public class linkTest {
	public static final String LINK_ID_TEST = "10";
	public static final String LINK_URL_TEST = "url";
	public static final String LINK_API_TEST = "api";
	private links link;

	@BeforeClass
	public void testSetUp() {
		System.out.println("Setting up LinkTest");
		this.link = new links(LINK_ID_TEST, LINK_URL_TEST, LINK_API_TEST);
		System.out.println("LinkTest setup complete.");
	}

	@Test
	public void verifyLinkConstructor() {
		System.out.println("Running LinkTest.verifyLinkConstructor()");
		Assert.assertEquals(link.placeId, LINK_ID_TEST);
		Assert.assertEquals(link.url, LINK_URL_TEST);
		System.out.println("Finished LinkTest.verifyLinkConstructor()");
	}

	@Test
	public void verifyLinkGetHours() throws IOException {
		System.out.println("Running LinkTest.verifyGetItems()");
		Assert.assertNull(link.getHours());
		System.out.println("Finished LinkTest.verifyGetItems()");
	}
	@Test
	public void verifyLinkGetSite() throws IOException {
		System.out.println("Running LinkTest.verifygetSite()");
		Assert.assertNull(link.getSite());
		System.out.println("Finished LinkTest.verifyGetSite()");
	}

	@AfterClass
	public void tearDown() {
		System.out.println("Completing LinkTest");
		this.link = (links) null;
		System.out.println("Exiting LinkTest");
	}
}