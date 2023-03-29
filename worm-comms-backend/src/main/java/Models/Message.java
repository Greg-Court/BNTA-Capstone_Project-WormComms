package Models;

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


}
