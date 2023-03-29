package services;

import models.Conversation;
import repositories.ConversationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

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

    public Conversation updateConversation(int id, Conversation conversation) {
        Optional<Conversation> optionalConversation = conversationRepository.findById(id);
        if (optionalConversation.isPresent()) {
            Conversation existingConversation = optionalConversation.get();
            existingConversation.setMessages(conversation.getMessages());
            return conversationRepository.save(existingConversation);
        }
        throw new NoSuchElementException("Conversation not found");
    }

    public void deleteConversation(int id) {
        conversationRepository.deleteById(id);
    }
}