package com.bnta.wormcomms.models;

public class FriendDTO {
    private int user1Id;
    private int user2Id;

    public FriendDTO(int user1Id, int user2Id) {
        this.user1Id = user1Id;
        this.user2Id = user2Id;
    }

    public FriendDTO(Friend friend) {
        this.user1Id = friend.getUser1().getId();
        this.user2Id = friend.getUser2().getId();
    }

    public int getUser1Id() {
        return user1Id;
    }

    public void setUser1Id(int user1Id) {
        this.user1Id = user1Id;
    }

    public int getUser2Id() {
        return user2Id;
    }

    public void setUser2Id(int user2Id) {
        this.user2Id = user2Id;
    }
}
