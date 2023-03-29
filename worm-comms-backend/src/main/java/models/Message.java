package models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name="messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name="userId")
    @JsonIgnoreProperties({"messages"})
    private int userId;

    @ManyToOne
    @JoinColumn(name="conversationId")
    @JsonIgnoreProperties({"conversation"})
    private int conversationId;

    @Column
    private String content;

    public Message() {
    }

    public Message(int userId, int conversationId, String content) {
        this.userId = userId;
        this.conversationId = conversationId;
        this.content = content;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getConversationId() {
        return conversationId;
    }

    public void setConversationId(int conversationId) {
        this.conversationId = conversationId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }


}
