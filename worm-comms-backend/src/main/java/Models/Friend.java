package Models;

import jakarta.persistence.*;

@Entity
@Table(name="friends")
public class Friend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    //here goes the link to the users
    @Column
    private User user1;

    @Column
    private User user2;

    public enum Status {
        PENDING,
        FRIEND,
        BLOCKED
    }
    @Column
    private Status status;
}
