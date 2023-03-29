package com.bnta.wormcomms.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name="messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id;

    @ManyToOne
    @JoinColumn(name="app_user", nullable = false)
    @JsonIgnoreProperties({"messages"})
    private User app_user;

    @ManyToOne
    @JoinColumn(name="conversation", nullable = false)
    @JsonIgnoreProperties({"messages"})
    private Conversation conversation;

    @Column
    private String content;

    public Message() {
    }

    public Message(User app_user, Conversation conversation, String content) {
        this.app_user = app_user;
        this.conversation = conversation;
        this.content = content;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getApp_user() {
        return app_user;
    }

    public void setApp_user(User app_user) {
        this.app_user = app_user;
    }

    public Conversation getConversation() {
        return conversation;
    }

    public void setConversation(Conversation conversation) {
        this.conversation = conversation;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
