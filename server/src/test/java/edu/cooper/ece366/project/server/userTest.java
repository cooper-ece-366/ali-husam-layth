// Ali Ghuman - testng class for User.java component

package edu.cooper.ece366.project.server;

import java.io.IOException;

import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import edu.cooper.ece366.project.server.Components.User;

//Ali worked on this class
public class userTest {
	public static final String USER_TEST_STRING = "test";
	public static final Long USER_TEST_LONG = new Long(5366623);
	public static final int USER_TEST_INT = 10;
	public static final Boolean USER_TEST_BOOLEAN = false;
	private User user;


	@BeforeClass
	public void testSetUp() throws IOException {
		System.out.println("Setting up user test");
		this.user = new User();
		System.out.println("user test setup complete.");
	}


	@Test
	public void verifysetId() throws IOException {
		System.out.println("Running user test.verifysetId()");
		user.setId(USER_TEST_LONG);
		Assert.assertEquals(user.getId(), USER_TEST_LONG);
		System.out.println("Finished user test.verifysetId()");
	}

	@Test
	public void verifysetName() throws IOException {
		System.out.println("Running user test.verifysetName()");
		user.setName(USER_TEST_STRING);
		Assert.assertEquals(user.getName(), USER_TEST_STRING);
		System.out.println("Finished user test.verifysetName()");
	}

	@Test
	public void verifysetEmail() throws IOException {
		System.out.println("Running user test.verifysetEmail()");
		user.setEmail(USER_TEST_STRING);
		Assert.assertEquals(user.getEmail(), USER_TEST_STRING);
		System.out.println("Finished user test.verifysetEmail()");
	}

	@Test
	public void verifysetImageUrl() throws IOException {
		System.out.println("Running user test.verifysetImageUrl()");
		user.setImageUrl(USER_TEST_STRING);
		Assert.assertEquals(user.getImageUrl(), USER_TEST_STRING);
		System.out.println("Finished user test.verifysetImageUrl()");
	}

	@Test
	public void verifysetPassword() throws IOException {
		System.out.println("Running user test.verifysetPassword()");
		user.setPassword(USER_TEST_STRING);
		Assert.assertEquals(user.getPassword(), USER_TEST_STRING);
		System.out.println("Finished user test.verifysetPassword()");
	}

	@Test
	public void verifysetProviderId() throws IOException {
		System.out.println("Running user test.verifysetProviderId()");
		user.setProviderId(USER_TEST_STRING);
		Assert.assertEquals(user.getProviderId(), USER_TEST_STRING);
		System.out.println("Finished user test.verifysetProviderId()");
	}

	@Test
	public void verifysetEmailVerified() throws IOException {
		System.out.println("Running user test.verifysetEmailVerified()");
		user.setEmailVerified(USER_TEST_BOOLEAN);
		Assert.assertEquals(user.getEmailVerified(), USER_TEST_BOOLEAN);
		System.out.println("Finished user test.verifysetEmailVerified()");
	}
	@AfterClass
	public void tearDown() {
		System.out.println("Completing user test");
		this.user = (User) null;
		System.out.println("Exiting user test");
	}
}


