package com.bnta.wormcomms.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name="conversations")
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id;

    @OneToMany(mappedBy = "conversation", orphanRemoval = true)
    @JsonIgnoreProperties({"conversation"})
    private List<Message> messages;

    @ManyToMany(mappedBy = "conversations")
    @JsonIgnoreProperties({"conversations"})
    private List<User> participants;

    @Column(name="created_at")
    private LocalDateTime createdAt;

    @Column(name="updated_at")
    private LocalDateTime updatedAt;

    public Conversation(int id, List<Message> messages, List<User> participants, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.messages = messages;
        this.participants = participants;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Conversation() {
    }

    public Conversation(List<Message> messages) {
        this.messages = messages;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }
}
