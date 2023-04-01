package com.bnta.wormcomms.models;

public class ChatDTO {
    private int id;
    private String name;
    private int participantCount;

    public ChatDTO(Chat chat) {
        this.id = chat.getId();
        this.name = chat.getName();
        this.participantCount = chat.getParticipants().size();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getParticipantCount() {
        return participantCount;
    }

    public void setParticipantCount(int participantCount) {
        this.participantCount = participantCount;
    }
}
