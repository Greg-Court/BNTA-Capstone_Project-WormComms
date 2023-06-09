package com.bnta.wormcomms.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.sql.Array;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="app_users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id;

    @Column
    private String username;

    @Column(name="first_name")
    private String firstName;

    @Column(name="last_name")
    private String lastName;

    @Column(name="profile_picture")
    private String profilePicture;

    @Column
    private String bio;

    @Column
    private String email;

    @Column
    private String password;

    @Column(name="created_at")
    private LocalDateTime createdAt;

    @Column(name="updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "sender", orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonIgnore //Properties({"sender","chat"})
    private List<Message> messages;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "chat_participants",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "chat_id")
    )
    @JsonIgnoreProperties({"participants","messages"})
    private List<Chat> chats;

    @OneToMany(mappedBy = "user1", fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"user1"})
    private List<Relationship> relationships = new ArrayList<>();

    @OneToMany(mappedBy = "user2", fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"user2"})
    private List<Relationship> inverseRelationships = new ArrayList<>();

    public User(int id, String username, String firstName, String lastName, String bio, String email, String password, List<Message> messages, List<Chat> chats) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.bio = bio;
        this.email = email;
        this.password = password;
        this.messages = new ArrayList<>();
        this.chats = new ArrayList<>();
        this.relationships = new ArrayList<>();
        this.inverseRelationships = new ArrayList<>();
    }

    public User(String username, String email, String password) {
        this.messages = new ArrayList<>();
        this.chats = new ArrayList<>();
        this.username = username;
        this.email = email;
        this.password = password;
        this.inverseRelationships = new ArrayList<>();
        this.relationships = new ArrayList<>();
    }

    public User() {
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", profilePicture='" + profilePicture + '\'' +
                ", bio='" + bio + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
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

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public List<Chat> getChats() {
        return chats;
    }

    public void setChats(List<Chat> chats) {
        this.chats = chats;
    }

    public String getEmail() {
        return email;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Relationship> getRelationships() {
        return relationships;
    }

    public void setRelationships(List<Relationship> relationships) {
        this.relationships = relationships;
    }

    public List<RelationshipDTO> getRelationshipDTOs() {
        List<RelationshipDTO> relationshipDTOS = new ArrayList<>();
        List<Relationship> allRelationships = new ArrayList<>(this.getRelationships());
        allRelationships.addAll(this.getInverseRelationships());
        for (Relationship relationship : allRelationships) {
            RelationshipDTO relationshipDTO = new RelationshipDTO(relationship);
            relationshipDTOS.add(relationshipDTO);
        }
        return relationshipDTOS;
    }

    public List<Relationship> getInverseRelationships() {
        return inverseRelationships;
    }

    public void setInverseRelationships(List<Relationship> inverseRelationships) {
        this.inverseRelationships = inverseRelationships;
    }
}
