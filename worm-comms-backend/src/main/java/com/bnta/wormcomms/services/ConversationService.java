package com.bnta.wormcomms.services;

import com.bnta.wormcomms.models.Chat;
import com.bnta.wormcomms.repositories.ConversationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ConversationService {

    @Autowired
    private ConversationRepo conversationRepository;

    public List<Chat> getAllConversations() {
        return conversationRepository.findAll();
    }

    public Chat saveConversation(Chat chat) {
        return conversationRepository.save(chat);
    }

    public Chat updateConversation(int id, Chat chat) {
        Optional<Chat> optionalConversation = conversationRepository.findById(id);
        if (optionalConversation.isPresent()) {
            Chat existingChat = optionalConversation.get();
            existingChat.setMessages(chat.getMessages());
            return conversationRepository.save(existingChat);
        }
        throw new NoSuchElementException("Conversation not found");
    }

    public void deleteConversation(int id) {
        conversationRepository.deleteById(id);
    }
}