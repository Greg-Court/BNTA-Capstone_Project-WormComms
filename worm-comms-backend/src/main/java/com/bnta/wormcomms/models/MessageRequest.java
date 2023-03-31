package com.bnta.wormcomms.models;

public class MessageRequest {
    private int senderId;
    private int chatId;
    private String content;

    public MessageRequest() {
    }

    public MessageRequest(int senderId, int chatId, String content) {
        this.senderId = senderId;
        this.chatId = chatId;
        this.content = content;
    }

    public int getSenderId() {
        return senderId;
    }

    public void setSenderId(int senderId) {
        this.senderId = senderId;
    }

    public int getChatId() {
        return chatId;
    }

    public void setChatId(int chatId) {
        this.chatId = chatId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
