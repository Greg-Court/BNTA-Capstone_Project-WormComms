package com.bnta.wormcomms.models;

public class RelationshipDTO {
    private int receiverId;
    private int senderId;
    private String receiverUsername;
    private String senderUsername;
    private Relationship.Status status;


    public RelationshipDTO(Relationship relationship) {
        this.receiverId = relationship.getUser2().getId();
        this.senderId = relationship.getUser1().getId();
        this.status = relationship.getStatus();
        this.receiverUsername = relationship.getUser2().getUsername();
        this.senderUsername = relationship.getUser1().getUsername();
    }

    public RelationshipDTO() {
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

    public String getReceiverUsername() {
        return receiverUsername;
    }

    public void setReceiverUsername(String receiverUsername) {
        this.receiverUsername = receiverUsername;
    }

    public int getSenderId() {
        return senderId;
    }

    public void setSenderId(int senderId) {
        this.senderId = senderId;
    }

    public String getSenderUsername() {
        return senderUsername;
    }

    public void setSenderUsername(String senderUsername) {
        this.senderUsername = senderUsername;
    }
}
