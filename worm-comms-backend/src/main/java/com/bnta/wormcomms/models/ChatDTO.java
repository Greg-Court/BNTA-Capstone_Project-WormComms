package com.bnta.wormcomms.models;

import java.util.ArrayList;
import java.util.List;

public class ChatDTO {
    private int id;
    private String name;
    private int participantCount;
    private List<MessageDTO> messages;
    private List<UserDTO> participants;

    public ChatDTO(Chat chat) {
        this.id = chat.getId();
        this.name = chat.getName();
        this.participantCount = chat.getParticipants().size();
        this.messages = new ArrayList<>();
        for (Message message : chat.getMessages()) {
            this.messages.add(new MessageDTO(message));
        }
        this.participants = new ArrayList<>();
        for (User user : chat.getParticipants()) {
            this.participants.add(new UserDTO(user.getId(),user.getUsername(), user.getFirstName(), user.getLastName(), user.getProfilePicture(), user.getBio(), null));
        }
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

    public List<MessageDTO> getMessages() {
        return messages;
    }

    public void setMessages(List<MessageDTO> messages) {
        this.messages = messages;
    }

    public List<UserDTO> getParticipants() {
        return participants;
    }

    public void setParticipants(List<UserDTO> participants) {
        this.participants = participants;
    }
}