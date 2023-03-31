package com.bnta.wormcomms.controllers;

import com.bnta.wormcomms.models.Message;
import com.bnta.wormcomms.models.MessageRequest;
import com.bnta.wormcomms.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class MessageController {
    @Autowired
    private MessageService messageService;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @SubscribeMapping("/user")
    public List<Message> getAllMessages() {
        return messageService.getAllMessages();
    }

    @MessageMapping("/user")
    @SendTo("/user")
    public void createMessage(@RequestBody MessageRequest messageRequest) {
        System.out.println("Sent message");
        Message savedMessage = messageService.saveMessage(messageRequest);
        simpMessagingTemplate.convertAndSend("/user", savedMessage);
    }

//    @PostMapping("/messages")
//    public ResponseEntity<Message> restCreateMessage(@RequestBody Message message) {
//        System.out.println("Sent message (REST)");
//        Message savedMessage = messageService.saveMessage(message);
//        return ResponseEntity.ok(savedMessage);
//    }


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