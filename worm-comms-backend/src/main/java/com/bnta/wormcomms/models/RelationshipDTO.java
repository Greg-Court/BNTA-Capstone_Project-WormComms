package com.bnta.wormcomms.models;

public class RelationshipDTO {
    private int receiverId;
    private String username;
    private Relationship.Status status;


    public RelationshipDTO(Relationship relationship) {
        this.receiverId = relationship.getUser2().getId();
        this.status = relationship.getStatus();
        this.username = relationship.getUser2().getUsername();
    }

    public int getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(int receiverId) {
        this.receiverId = receiverId;
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
