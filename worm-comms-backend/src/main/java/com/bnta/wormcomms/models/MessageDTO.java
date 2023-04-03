package com.bnta.wormcomms.models;
import com.bnta.wormcomms.models.Message;
import com.bnta.wormcomms.models.User;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;

public class MessageDTO {

    private int id;

    private String content;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private boolean isRead;

    private int senderId;

    private int chatId;
    private String senderUsername;

    public MessageDTO(Message message) {
        this.id = message.getId();
        this.content = message.getContent();
        this.createdAt = message.getCreatedAt();
        this.updatedAt = message.getUpdatedAt();
        this.isRead = message.isRead();
        this.chatId = message.getChat().getId();
        this.senderId = message.getSender().getId();
        this.senderUsername = message.getSender().getUsername();
    }

    public int getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public boolean isRead() {
        return isRead;
    }

    public int getSenderId() {
        return senderId;
    }

    public int getChatId() {
        return chatId;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setRead(boolean read) {
        isRead = read;
    }

    public void setSenderId(int senderId) {
        this.senderId = senderId;
    }

    public void setChatId(int chatId) {
        this.chatId = chatId;
    }

    public String getSenderUsername() {
        return senderUsername;
    }

    public void setSenderUsername(String senderUsername) {
        this.senderUsername = senderUsername;
    }
}
