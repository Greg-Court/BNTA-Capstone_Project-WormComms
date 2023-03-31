package com.bnta.wormcomms.components;

import com.bnta.wormcomms.models.Chat;
import com.bnta.wormcomms.models.Friend;
import com.bnta.wormcomms.models.Message;
import com.bnta.wormcomms.models.User;
import com.bnta.wormcomms.repositories.ChatRepo;
import com.bnta.wormcomms.repositories.FriendsRepo;
import com.bnta.wormcomms.repositories.UserRepo;
import com.bnta.wormcomms.repositories.MessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.data.repository.core.support.FragmentNotImplementedException;
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
    FriendsRepo friendRepo;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        User greg = new User("Greg", "greg@bnta.com");
        User hansine = new User("Hansine", "hansine@bnta.com");
        User james = new User("James", "james@bnta.com");

        List<User> participants = new ArrayList<>();
        participants.add(greg);
        participants.add(james);
        Chat chat = new Chat("testchat9000", participants);
        // I was stuck on this for ages, I couldnt figure out why participants were not showing in the chat
        // Because it's a bidirectional relationship, you need to make sure to set the relationship on both sides
        for (User participant : participants) {
            participant.getChats().add(chat);
        }
        // Also need to save the Chat first, before anything else
        chatRepo.save(chat);

        Message message1 = new Message(james, chat, "hello");
        Message message2 = new Message(greg, chat, "hi");
        Friend friend1 = new Friend(james,greg, Friend.Status.FRIEND,3);
        Friend friend2 = new Friend(hansine,james, Friend.Status.FRIEND,3);
        Friend friend3 = new Friend(greg,hansine, Friend.Status.FRIEND,3);

        userRepo.save(hansine);
        userRepo.save(james);
        userRepo.save(greg);
        messageRepo.save(message1);
        messageRepo.save(message2);
        friendRepo.save(friend1);
        friendRepo.save(friend2);
        friendRepo.save(friend3);

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


