package com.bnta.wormcomms.controllers;

import com.bnta.wormcomms.models.*;
import com.bnta.wormcomms.repositories.ChatRepo;
import com.bnta.wormcomms.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.converter.MessageConversionException;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class MessageController {
    @Autowired
    private MessageService messageService;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    ChatRepo chatRepo;

    @MessageMapping("/newMessage")
    @MessageExceptionHandler(MessageConversionException.class)
    public void createMessage(@RequestBody MessageRequest messageRequest) {
        Message savedMessage = messageService.saveMessage(messageRequest);
        MessageDTO messageToSend = new MessageDTO(savedMessage);
        System.out.println(messageToSend.toString());
        Chat chat = chatRepo.findById(messageRequest.getChatId()).get();
        for(User user : chat.getParticipants()) {
            simpMessagingTemplate.convertAndSend("/user/" + user.getId(), messageToSend);
        }
    }



    @PutMapping("/{id}")
    public Message updateMessage(@PathVariable int id, @RequestBody Message message) {
        return messageService.updateMessage(id, message);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMessage(@PathVariable int id) {
        messageService.deleteMessage(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}