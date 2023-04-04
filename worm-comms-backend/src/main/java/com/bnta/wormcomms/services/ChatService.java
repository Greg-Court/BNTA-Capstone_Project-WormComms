package com.bnta.wormcomms.services;

import com.bnta.wormcomms.models.Chat;
import com.bnta.wormcomms.models.ChatDTO;
import com.bnta.wormcomms.models.ChatRequest;
import com.bnta.wormcomms.models.User;
import com.bnta.wormcomms.repositories.ChatRepo;
import com.bnta.wormcomms.repositories.UserRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Slf4j
@Service
public class ChatService {

    @Autowired
    private ChatRepo chatRepository;
    @Autowired
    private UserRepo userRepository;

    public List<Chat> getAllChats() {
        return chatRepository.findAll();
    }

    public Chat saveChat(ChatRequest chatRequest) {
        Chat chat = new Chat(chatRequest.getName());
        log.info("ChatRequest Chat Name: {}", chatRequest.getName());
        log.info("Chat participant IDs: {}", chatRequest.getParticipantIds());
        List<User> participants = userRepository.findAllByIds(chatRequest.getParticipantIds());
        log.info("Chat participants: {}", participants.toString());
        chat.setParticipants(participants);
        for (User participant : participants) {
            participant.getChats().add(chat);
        }
        log.info("Chat: {}", chat.toString());
        Chat savedChat = chatRepository.save(chat);
        for (User participant : participants) {
            userRepository.save(participant);
        }
        System.out.println(savedChat.toString());
        return savedChat;
    }

    public Chat updateChat(int id, ChatDTO chatDTO) {
        Optional<Chat> optionalChat = chatRepository.findById(id);
        if (optionalChat.isPresent()) {
            Chat existingChat = optionalChat.get();
            existingChat.setName(chatDTO.getName());
            return chatRepository.save(existingChat);
        }
        throw new NoSuchElementException("Chat not found");
    }

    public void deleteChat(int id) {
        chatRepository.deleteById(id);
    }

    public List<ChatDTO> getChatsForUser(int userId) {
        List<Chat> chats = chatRepository.findByParticipantsId(userId);
        List<ChatDTO> chatDTOS = new ArrayList<>();
        for (Chat chat : chats) {
            ChatDTO chatDTO = new ChatDTO(chat);
            chatDTOS.add(chatDTO);
        }
        return chatDTOS;
    }

    public ChatDTO getChatById(int id){
        Optional<Chat> optionalChat = chatRepository.findById(id);
        if (optionalChat.isPresent()) {
            return new ChatDTO(optionalChat.get());
        } else {
            throw new NoSuchElementException("Chat with id " + id + " not found");
        }
    }
}