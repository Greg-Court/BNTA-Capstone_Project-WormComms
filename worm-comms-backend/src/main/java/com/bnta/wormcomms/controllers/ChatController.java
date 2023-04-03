package com.bnta.wormcomms.controllers;

import com.bnta.wormcomms.models.*;
import com.bnta.wormcomms.services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api/chats")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @GetMapping
    public List<Chat> getAllChats() {
        return chatService.getAllChats();
    }

    @GetMapping("/{id}")
    public Chat getChatById(@PathVariable("id") int id) {
        return chatService.getChatById(id);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<ChatDTO>> getUserChats(@PathVariable("id") int id) {
        List<ChatDTO> userChats = chatService.getChatsForUser(id);
        return new ResponseEntity<>(userChats, HttpStatus.OK);
    }

    @PostMapping
    public Chat createChat(@RequestBody ChatRequest chatRequest) {
        return chatService.saveChat(chatRequest);
    }

    @PutMapping("/{id}")
    public Chat updateChat(@PathVariable int id, @RequestBody Chat chat) {
        System.out.println(chat);
        return chatService.updateChat(id, chat);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteChat(@PathVariable int id) {
        chatService.deleteChat(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}