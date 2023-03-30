package com.bnta.wormcomms.models;

import java.util.List;

public class ChatRequest {
    private String name;
    private List<Integer> participantIds;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Integer> getParticipantIds() {
        return participantIds;
    }

    public void setParticipantIds(List<Integer> participantIds) {
        this.participantIds = participantIds;
    }
}
