package com.bnta.wormcomms.controllers;

import com.bnta.wormcomms.models.Message;
import com.bnta.wormcomms.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class MessageController {
    @Autowired
    private MessageService messageService;


    public List<Message> getAllMessages() {
        return messageService.getAllMessages();
    }

    @MessageMapping
    @SendTo("/user")
    public Message createMessage(@RequestBody Message message) {
        System.out.println("Sent message");
        return messageService.saveMessage(message);
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