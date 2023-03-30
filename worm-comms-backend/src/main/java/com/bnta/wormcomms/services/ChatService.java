package com.bnta.wormcomms.services;

import com.bnta.wormcomms.models.Chat;
import com.bnta.wormcomms.repositories.ChatRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ChatService {

    @Autowired
    private ChatRepo chatRepository;

    public List<Chat> getAllChats() {
        return chatRepository.findAll();
    }

    public Chat saveChat(Chat chat) {
        return chatRepository.save(chat);
    }

    public Chat updateChat(int id, Chat chat) {
        Optional<Chat> optionalChat = chatRepository.findById(id);
        if (optionalChat.isPresent()) {
            Chat existingChat = optionalChat.get();
            existingChat.setMessages(chat.getMessages());
            return chatRepository.save(existingChat);
        }
        throw new NoSuchElementException("Chat not found");
    }

    public void deleteChat(int id) {
        chatRepository.deleteById(id);
    }
}