package com.bnta.wormcomms.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name="messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name="app_user")
    @JsonIgnoreProperties({"messages"})
    private User app_user;

    @ManyToOne
    @JoinColumn(name="conversation")
    @JsonIgnoreProperties({"conversation"})
    private Conversation conversation;

    @Column
    private String content;

    public Message() {
    }

    public Message(User user, Conversation conversation, String content) {
        this.app_user = user;
        this.conversation = conversation;
        this.content = content;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public User getUser() {
        return app_user;
    }

    public void setUser(User user) {
        this.app_user = user;
    }

    public Conversation getConversation() {
        return conversation;
    }

    public void setConversation(Conversation conversation) {
        this.conversation = conversation;
    }
}
