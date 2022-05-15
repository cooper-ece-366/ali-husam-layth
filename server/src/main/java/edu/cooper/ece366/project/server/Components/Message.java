// Husam Almanakly - temporary class for api testing

package edu.cooper.ece366.project.server.Components;

public class Message {

    private String text;

    public Message(String string) {
        this.text = string;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}