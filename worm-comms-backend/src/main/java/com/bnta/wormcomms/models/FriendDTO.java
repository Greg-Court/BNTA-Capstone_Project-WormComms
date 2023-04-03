package com.bnta.wormcomms.models;

public class FriendDTO {
    private int userId;
    private String username;
    private Friend.Status status;


    public FriendDTO(Friend friend) {
        this.userId = friend.getUser2().getId();
        this.status = friend.getStatus();
        this.username = friend.getUser2().getUsername();
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public Friend.Status getStatus() {
        return status;
    }

    public void setStatus(Friend.Status status) {
        this.status = status;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
