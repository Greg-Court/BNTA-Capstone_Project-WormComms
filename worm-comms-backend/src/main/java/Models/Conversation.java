package Models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="conversations")
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToMany(mappedBy = "conversationId")
    private List<Message> messages;


}
