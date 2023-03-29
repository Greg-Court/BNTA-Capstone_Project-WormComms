package com.bnta.wormcomms.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name="friends")
public class Friend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    //here goes the link to the users
    @ManyToOne
    @JoinColumn(name="user1")
    @JsonIgnoreProperties({"friends"})
    private User user1;

    @ManyToOne
    @JoinColumn(name="user2")
    @JsonIgnoreProperties({"friends"})
    private User user2;

    public enum Status {
        PENDING,
        FRIEND,
        BLOCKED
    }
    @Column
    @Enumerated(EnumType.STRING)
    private Status status;
}