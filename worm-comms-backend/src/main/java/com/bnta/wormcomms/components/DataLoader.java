package com.bnta.wormcomms.components;

import com.bnta.wormcomms.models.Conversation;
import com.bnta.wormcomms.models.Message;
import com.bnta.wormcomms.models.User;
import com.bnta.wormcomms.repositories.ConversationRepo;
import com.bnta.wormcomms.repositories.UserRepo;
import com.bnta.wormcomms.repositories.MessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements ApplicationRunner {
    @Autowired
    ConversationRepo conversationRepo;
    @Autowired
    MessageRepo messageRepo;
    @Autowired
    UserRepo userRepo;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        User user = new User();
        Message message = new Message();
        Conversation conversation = new Conversation();
        userRepo.save(user);
        messageRepo.save(message);
        conversationRepo.save(conversation);
    }
}
