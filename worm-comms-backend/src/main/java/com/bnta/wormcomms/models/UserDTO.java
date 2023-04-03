package com.bnta.wormcomms.models;

import java.util.ArrayList;
import java.util.List;

public class UserDTO {
    private int id; // Add the ID field
    private String username;
    private String firstName;
    private String lastName;
    private String profilePicture;
    private String bio;
    private List<RelationshipDTO> relationships;
    private String email;

    public UserDTO(int id, String username, String firstName, String lastName, String profilePicture, String bio, List<RelationshipDTO> relationships, String email) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.profilePicture = profilePicture;
        this.bio = bio;
        this.relationships = new ArrayList<>();
        this.email = email;
    }

    public UserDTO(int id, String username, String email, String firstName, String lastName, List<RelationshipDTO> relationships) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.relationships = new ArrayList<>();
    }

    public UserDTO(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.profilePicture = user.getProfilePicture();
        this.bio = user.getBio();
        this.relationships = user.getRelationshipDTOs();
        this.email = user.getEmail();
    }


    // Add getters and setters for the new ID field
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

    public List<RelationshipDTO> getRelationships() {
        return relationships;
    }

    public void setRelationships(List<RelationshipDTO> relationships) {
        this.relationships = relationships;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
