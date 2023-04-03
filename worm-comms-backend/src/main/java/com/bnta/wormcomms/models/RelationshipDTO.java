package com.bnta.wormcomms.models;

public class RelationshipDTO {
    private int userId;
    private String username;
    private Relationship.Status status;


    public RelationshipDTO(Relationship relationship) {
        this.userId = relationship.getUser2().getId();
        this.status = relationship.getStatus();
        this.username = relationship.getUser2().getUsername();
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public Relationship.Status getStatus() {
        return status;
    }

    public void setStatus(Relationship.Status status) {
        this.status = status;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
