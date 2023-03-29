package components;

import Models.Conversation;
import Models.Message;
import Models.User;
import Repositories.ConversationRepo;
import Repositories.MessageRepo;
import Repositories.UserRepo;
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
