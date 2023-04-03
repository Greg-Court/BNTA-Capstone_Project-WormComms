package com.bnta.wormcomms.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name="relationships")
// JsonIdentityInfo added to prevent infinite recursion errors when making get requests & other
//@JsonIdentityInfo(
//        generator = ObjectIdGenerators.PropertyGenerator.class,
//        property = "id")
public class Relationship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name="user1")
    @JsonIgnoreProperties({"relationships"})
//    @JsonBackReference
    private User user1;

    @ManyToOne
    @JoinColumn(name="user2")
    @JsonIgnoreProperties({"relationships","messages","chats","password"})
//    @JsonBackReference
    private User user2;

    @Column
    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(name="created_at")
    private LocalDateTime createdAt;

    @Column(name="updated_at")
    private LocalDateTime updatedAt;

    public enum Status {
        PENDING,
        FRIEND,
        BLOCKED
    }

    public Relationship(User user1, User user2, Status status) {
        this.user1 = user1;
        this.user2 = user2;
        this.status = status;
    }

    public Relationship(int id, User user1, User user2, Status status, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.user1 = user1;
        this.user2 = user2;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return "Relationship{" +
                "id=" + id +
                ", user1=" + (user1 != null ? user1.getUsername() : "null") +
                ", user2=" + (user2 != null ? user2.getUsername() : "null") +
                ", status=" + status +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
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


    public Relationship() {
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