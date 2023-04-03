package com.bnta.wormcomms.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name="messages")
// JsonIdentityInfo added to prevent infinite recursion errors when making get requests & other
//@JsonIdentityInfo(
//        generator = ObjectIdGenerators.PropertyGenerator.class,
//        property = "id")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    @JsonIgnoreProperties({"messages","chats","relationships","password"})
    private User sender;

    @ManyToOne
    @JoinColumn(name = "chat_id")
    @JsonIgnoreProperties({"messages"})
    private Chat chat;

    @Column
    private String content;

    @Column(name="created_at")
    private LocalDateTime createdAt;

    @Column(name="updated_at")
    private LocalDateTime updatedAt;

    @Column(name="is_read")
    private boolean isRead;

    public Message() {
    }

    public Message(int id, User sender, Chat chat, String content, LocalDateTime createdAt, LocalDateTime updatedAt, boolean isRead) {
        this.id = id;
        this.sender = sender;
        this.chat = chat;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.isRead = isRead;
    }

    public Message(User sender, Chat chat, String content) {
        this.sender = sender;
        this.chat = chat;
        this.content = content;
//        chat.getMessages().add(this); // Add this line
    }

    @Override
    public String toString() {
        return "Message{" +
                "id=" + id +
                ", sender=" + (sender != null ? sender.getUsername() : "null") +
                ", content='" + content + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", isRead=" + isRead +
                '}';
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public boolean isRead() {
        return isRead;
    }

    public void setRead(boolean read) {
        isRead = read;
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

    public Chat getChat() {
        return chat;
    }

    public void setChat(Chat chat) {
        this.chat = chat;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }


}
