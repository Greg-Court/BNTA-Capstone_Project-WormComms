package com.bnta.wormcomms.services;

import com.bnta.wormcomms.models.Chat;
import com.bnta.wormcomms.models.Message;
import com.bnta.wormcomms.models.MessageRequest;
import com.bnta.wormcomms.models.User;
import com.bnta.wormcomms.repositories.ChatRepo;
import com.bnta.wormcomms.repositories.MessageRepo;
import com.bnta.wormcomms.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class MessageService {
    @Autowired
    private MessageRepo messageRepository;
    @Autowired
    private UserRepo userRepository;
    @Autowired
    private ChatRepo chatRepository;

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    public Message saveMessage(MessageRequest messageRequest) {
        User sender = userRepository.findById(messageRequest.getSenderId()).get();
        Chat chat = chatRepository.findById(messageRequest.getChatId()).get();
        Message newMessage = new Message(sender, chat, messageRequest.getContent());
        return messageRepository.save(newMessage);
    }

    public Message updateMessage(int id, Message message) {
        Optional<Message> optionalMessage = messageRepository.findById(id);
        if (optionalMessage.isPresent()) {
            Message existingMessage = optionalMessage.get();
            existingMessage.setSender(message.getSender());
            existingMessage.setChat(message.getChat());
            existingMessage.setContent(message.getContent());
            return messageRepository.save(existingMessage);
        }
        throw new NoSuchElementException("Message not found");
    }

    public void deleteMessage(int id) {
        messageRepository.deleteById(id);
    }
}