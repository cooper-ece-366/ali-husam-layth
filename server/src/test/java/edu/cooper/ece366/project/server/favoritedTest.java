// Ali Ghuman - testng class for favorited.java component

package edu.cooper.ece366.project.server;

import java.io.IOException;

import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import edu.cooper.ece366.project.server.Components.favorited;

//Ali worked on this class
public class favoritedTest {
	public static final String FAVORITED_TEST_STRING = "test";
	public static final Long FAVORITED_TEST_LONG = new Long(5366623);
	public static final int FAVORITED_TEST_INT = 10;
	private favorited favorited;


	@BeforeClass
	public void testSetUp() throws IOException {
		System.out.println("Setting up favorited test");
		this.favorited = new favorited();
		System.out.println("favorited test setup complete.");
	}


	@Test
	public void verifysetID() throws IOException {
		System.out.println("Running favorited test.verifysetID()");
		favorited.setId(FAVORITED_TEST_LONG);
		Assert.assertEquals(favorited.getId(), FAVORITED_TEST_LONG);
		System.out.println("Finished favorited test.verifysetID()");
	}

	@Test
	public void verifysetPlace() throws IOException {
		System.out.println("Running favorited test.verifysetPlace()");
		favorited.setPlace(FAVORITED_TEST_STRING);
		Assert.assertEquals(favorited.getPlace(), FAVORITED_TEST_STRING);
		System.out.println("Finished favorited test.verifysetPlace()");
	}

	@Test
	public void verifysetUserID() throws IOException {
		System.out.println("Running favorited test.verifysetUserID()");
		favorited.setUserID(FAVORITED_TEST_INT);
		Assert.assertEquals(favorited.getUserID(), FAVORITED_TEST_INT);
		System.out.println("Finished favorited test.verifysetUserID()");
	}

	@Test
	public void verifysetName() throws IOException {
		System.out.println("Running favorited test.verifysetName()");
		favorited.setName(FAVORITED_TEST_STRING);
		Assert.assertEquals(favorited.getName(), FAVORITED_TEST_STRING);
		System.out.println("Finished favorited test.verifysetName()");
	}

	@AfterClass
	public void tearDown() {
		System.out.println("Completing favorited test");
		this.favorited = (favorited) null;
		System.out.println("Exiting favorited test");
	}
}

