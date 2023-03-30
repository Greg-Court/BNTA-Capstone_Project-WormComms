package com.bnta.wormcomms.controllers;

import com.bnta.wormcomms.models.Chat;
import com.bnta.wormcomms.services.ConversationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conversations")
public class ConversationController {

    @Autowired
    private ConversationService conversationService;

    @GetMapping
    public List<Chat> getAllConversations() {
        return conversationService.getAllConversations();
    }

    @PostMapping
    public Chat createConversation(@RequestBody Chat chat) {
        return conversationService.saveConversation(chat);
    }

    @PutMapping("/{id}")
    public Chat updateConversation(@PathVariable int id, @RequestBody Chat chat) {
        return conversationService.updateConversation(id, chat);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteConversation(@PathVariable int id) {
        conversationService.deleteConversation(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}