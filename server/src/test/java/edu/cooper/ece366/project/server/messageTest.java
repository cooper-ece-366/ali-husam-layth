package edu.cooper.ece366.project.server;

import java.io.IOException;

import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import edu.cooper.ece366.project.server.Components.Message;

//Ali worked on this class
public class messageTest {
	public static final String MESSAGE_TEXT_TEST = "test";
	public static final String MESSAGE_TEXT_TEST_2 = "test2";
	private Message message;


	@BeforeClass
	public void testSetUp() {
		System.out.println("Setting up Message test");
		this.message = new Message(MESSAGE_TEXT_TEST);
		System.out.println("Message test setup complete.");
	}

	@Test
	public void verifyGetText() throws IOException {
		System.out.println("Running Message test.verifyGetItems()");
		Assert.assertEquals(MESSAGE_TEXT_TEST, message.getText());
		System.out.println("Finished Message test.verifyGetItems()");
	}

	@Test
	public void verifySetText() throws IOException {
		System.out.println("Running Message test.verifyGetItems()");
		message.setText(MESSAGE_TEXT_TEST_2);
		Assert.assertEquals(MESSAGE_TEXT_TEST_2, message.getText());
		System.out.println("Finished Message test.verifyGetItems()");
	}

	@AfterClass
	public void tearDown() {
		System.out.println("Completing Message test");
		this.message = (Message) null;
		System.out.println("Exiting Message test");
	}
}

