package services;

import models.Message;
import repositories.MessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class MessageService {
    @Autowired
    private MessageRepo messageRepository;

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    public Message saveMessage(Message message) {
        return messageRepository.save(message);
    }

    public Message updateMessage(int id, Message message) {
        Optional<Message> optionalMessage = messageRepository.findById(id);
        if (optionalMessage.isPresent()) {
            Message existingMessage = optionalMessage.get();
            existingMessage.setUserId(message.getUserId());
            existingMessage.setConversationId(message.getConversationId());
            existingMessage.setContent(message.getContent());
            return messageRepository.save(existingMessage);
        }
        throw new NoSuchElementException("Message not found");
    }

    public void deleteMessage(int id) {
        messageRepository.deleteById(id);
    }
}