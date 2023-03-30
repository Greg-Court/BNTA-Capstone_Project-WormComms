package com.bnta.wormcomms.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name="friends")
public class Friend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    //here goes the link to the users
    @ManyToOne
    @JoinColumn(name="user1")
    @JsonIgnoreProperties({"friends"})
    private User user1;

    @ManyToOne
    @JoinColumn(name="user2")
    @JsonIgnoreProperties({"friends"})
    private User user2;

    public enum Status {
        PENDING,
        FRIEND,
        BLOCKED
    }
    @Column
    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(name="created_at")
    private LocalDateTime createdAt;

    @Column(name="updated_at")
    private LocalDateTime updatedAt;

    public Friend(int id, User user1, User user2, Status status, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.user1 = user1;
        this.user2 = user2;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Friend() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser1() {
        return user1;
    }

    public void setUser1(User user1) {
        this.user1 = user1;
    }

    public User getUser2() {
        return user2;
    }

    public void setUser2(User user2) {
        this.user2 = user2;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}