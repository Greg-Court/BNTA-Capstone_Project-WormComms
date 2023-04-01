package com.bnta.wormcomms.models;

import java.util.List;

public class UserDTO {
    private String username;
    private String firstName;
    private String lastName;
    private String profilePicture;
    private String bio;
    private List<FriendDTO> friends;

    public UserDTO(String username, String firstName, String lastName, String profilePicture, String bio, List<FriendDTO> friends) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.profilePicture = profilePicture;
        this.bio = bio;
        this.friends = friends;
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

    public List<FriendDTO> getFriends() {
        return friends;
    }

    public void setFriends(List<FriendDTO> friends) {
        this.friends = friends;
    }
}
