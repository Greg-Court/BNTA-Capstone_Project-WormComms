package controllers;

import models.Conversation;
import services.ConversationService;
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
    public List<Conversation> getAllConversations() {
        return conversationService.getAllConversations();
    }

    @PostMapping
    public Conversation createConversation(@RequestBody Conversation conversation) {
        return conversationService.saveConversation(conversation);
    }

    @PutMapping("/{id}")
    public Conversation updateConversation(@PathVariable int id, @RequestBody Conversation conversation) {
        return conversationService.updateConversation(id, conversation);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteConversation(@PathVariable int id) {
        conversationService.deleteConversation(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}