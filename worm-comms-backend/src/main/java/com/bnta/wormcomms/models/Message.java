package com.bnta.wormcomms.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name="messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    @JsonIgnoreProperties({"messages"})
    private User sender;

    @ManyToOne
    @JoinColumn(name = "conversation_id")
    @JsonIgnoreProperties({"messages"})
    private Conversation conversation;

    @Column
    private String content;

    @Column(name="created_at")
    private LocalDateTime createdAt;

    @Column(name="updated_at")
    private LocalDateTime updatedAt;

    public Message() {
    }

    public Message(int id, User sender, Conversation conversation, String content, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.sender = sender;
        this.conversation = conversation;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Message(User sender, Conversation conversation, String content) {
        this.sender = sender;
        this.conversation = conversation;
        this.content = content;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
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
