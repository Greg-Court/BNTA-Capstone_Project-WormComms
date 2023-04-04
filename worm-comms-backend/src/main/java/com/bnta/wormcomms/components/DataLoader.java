package com.bnta.wormcomms.components;

import com.bnta.wormcomms.models.Chat;
import com.bnta.wormcomms.models.Relationship;
import com.bnta.wormcomms.models.Message;
import com.bnta.wormcomms.models.User;
import com.bnta.wormcomms.repositories.ChatRepo;
import com.bnta.wormcomms.repositories.RelationshipRepo;
import com.bnta.wormcomms.repositories.UserRepo;
import com.bnta.wormcomms.repositories.MessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DataLoader implements ApplicationRunner {
    @Autowired
    ChatRepo chatRepo;
    @Autowired
    MessageRepo messageRepo;
    @Autowired
    UserRepo userRepo;
    @Autowired
    RelationshipRepo friendRepo;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        User greg = new User("Greg", "greg@bnta.com");
        User hansine = new User("Hansine", "hansine@bnta.com");
        User james = new User("James", "james@bnta.com");
        User rick = new User("Rick", "rick@bnta.com");
        User morty = new User("Morty", "morty@bnta.com");
        User summer = new User("Summer", "summer@bnta.com");
        User jerry = new User("Jerry", "jerry@bnta.com");
        User squanchy = new User("Squanchy", "squanchy@bnta.com");
        User birdperson = new User("Birdperson", "birdperson@bnta.com");
        User strangeperson = new User("Strangeperson", "strangeperson@bnta.com");

//        List<User> participants = new ArrayList<>();
//        participants.add(greg);
//        participants.add(james);
//        Chat chat = new Chat("testchat9000", participants);
//        // I was stuck on this for ages, I couldnt figure out why participants were not showing in the chat
//        // Because it's a bidirectional relationship, you need to make sure to set the relationship on both sides
//        for (User participant : participants) {
//            participant.getChats().add(chat);
//        }
//        // Also need to save the Chat first, before anything else
//        chatRepo.save(chat);

//        Message message1 = new Message(james, chat, "hello");
//        Message message2 = new Message(greg, chat, "hi");
        Relationship relationship1 = new Relationship(james,greg, Relationship.Status.FRIEND);
        Relationship relationship2 = new Relationship(hansine,james, Relationship.Status.FRIEND);
        Relationship relationship3 = new Relationship(greg,hansine, Relationship.Status.FRIEND);
        Relationship relationship4 = new Relationship(greg,james, Relationship.Status.FRIEND);
        Relationship relationship5 = new Relationship(hansine,greg, Relationship.Status.FRIEND);
        Relationship relationship6 = new Relationship(james,hansine, Relationship.Status.FRIEND);
        Relationship relationship7 = new Relationship(strangeperson,greg, Relationship.Status.PENDING);
        Relationship relationship8 = new Relationship(strangeperson,james, Relationship.Status.PENDING);
        Relationship relationship9 = new Relationship(strangeperson,hansine, Relationship.Status.PENDING);

        userRepo.save(hansine);
        userRepo.save(james);
        userRepo.save(greg);
        userRepo.save(rick);
        userRepo.save(morty);
        userRepo.save(summer);
        userRepo.save(jerry);
        userRepo.save(squanchy);
        userRepo.save(birdperson);
        userRepo.save(strangeperson);
//        messageRepo.save(message1);
//        messageRepo.save(message2);
//        friendRepo.save(relationship1);
//        friendRepo.save(relationship2);
//        friendRepo.save(relationship3);
//        friendRepo.save(relationship4);
//        friendRepo.save(relationship5);
//        friendRepo.save(relationship6);
//        friendRepo.save(relationship7);
//        friendRepo.save(relationship8);
//        friendRepo.save(relationship9);

//        User greg = new User("Greg", "greg@bnta.com");
//        User hansine = new User("Hansine", "hansine@bnta.com");
//        User james = new User("James", "james@bnta.com");
//        Chat chat1 = new Chat();
//        Message message1 = new Message(james, chat1, "hello");
//        Message message2 = new Message(greg, chat1, "hi");
//        chatRepo.save(chat1);
//        Friend friend1 = new Friend(james, greg, Friend.Status.FRIEND, 3);
//        Friend friend2 = new Friend(james, hansine, Friend.Status.FRIEND, 3);
//        Friend friend3 = new Friend(greg, james, Friend.Status.FRIEND, 3);
//        Friend friend4 = new Friend(greg, hansine, Friend.Status.FRIEND, 3);
//        Friend friend5 = new Friend(hansine, greg, Friend.Status.FRIEND, 3);
//        Friend friend6 = new Friend(hansine, james, Friend.Status.FRIEND, 3);
//        userRepo.save(greg);
//        userRepo.save(hansine);
//        userRepo.save(james);
//        friendRepo.save(friend1);
//        friendRepo.save(friend2);
//        friendRepo.save(friend3);
//        friendRepo.save(friend4);
//        friendRepo.save(friend5);
//        friendRepo.save(friend6);
    }
}


