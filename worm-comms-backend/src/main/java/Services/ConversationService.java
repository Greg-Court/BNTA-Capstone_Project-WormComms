package Services;

import Models.Conversation;
import Repositories.ConversationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConversationService {

    @Autowired
    private ConversationRepo conversationRepository;

    public List<Conversation> getAllConversations() {
        return conversationRepository.findAll();
    }

    public Conversation saveConversation(Conversation conversation) {
        return conversationRepository.save(conversation);
    }
}