package com.bnta.wormcomms.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="app_users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id;

    @OneToMany(mappedBy = "app_user",orphanRemoval = true)
    @JsonIgnoreProperties({"app_user"})
    private List<Message> messages;

//    @OneToMany(mappedBy = "user1")
//    @JsonIgnoreProperties({"user1"})
//    private List<Friend> friends;

    @Column
    private String username;

    @Column
    private String email;

    public User(List<Message> messages, List<Friend> friends, String username, String email) {
        this.messages = messages;
        //this.friends = friends;
        this.username = username;
        this.email = email;
    }

    public User(String username, String email) {
        this.username = username;
        this.email = email;
    }

    public User() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
