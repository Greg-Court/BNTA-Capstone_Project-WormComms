package com.bnta.wormcomms.controllers;

import com.bnta.wormcomms.models.Relationship;
import com.bnta.wormcomms.models.RelationshipDTO;
import com.bnta.wormcomms.services.RelationshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/relationships")
public class RelationshipController {
    @Autowired
    private RelationshipService relationshipService;

    @PostMapping
    public ResponseEntity<RelationshipDTO> createRelationship(@RequestBody Relationship relationship) {
        return new ResponseEntity<>(new RelationshipDTO(relationshipService.createFriend(relationship)), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<RelationshipDTO>> getUserRelationships(@PathVariable int id) {
        return new ResponseEntity<>(new ArrayList<RelationshipDTO>(relationshipService.findAllFriendsByUserId(id)), HttpStatus.OK);
    }

    @PutMapping("/accept/{userId}/{targetUserId}")
    public ResponseEntity<Relationship> acceptFriendRequest(
            @PathVariable("userId") int userId, @PathVariable("targetUserId") int targetUserId) {
        Relationship relationship = relationshipService.acceptFriendRequest(userId, targetUserId);
        return new ResponseEntity<>(relationship, HttpStatus.OK);
    }

    @PutMapping("/block/{userId}/{targetUserId}")
    public ResponseEntity<Relationship> blockPerson(
            @PathVariable("userId") int userId, @PathVariable("targetUserId") int targetUserId) {
        Relationship relationship = relationshipService.blockFriend(userId, targetUserId);
        return new ResponseEntity<>(relationship, HttpStatus.OK);
    }

    @PutMapping("/reject/{userId}/{targetUserId}")
    public ResponseEntity<Void> rejectFriendRequest(
            @PathVariable("userId") int userId, @PathVariable("targetUserId") int targetUserId) {
        relationshipService.rejectFriendRequest(userId, targetUserId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/cancelRequest/{userId}/{targetUserId}")
    public ResponseEntity<Void> cancelFriendRequest(
            @PathVariable("userId") int userId, @PathVariable("targetUserId") int targetUserId) {
        relationshipService.cancelFriendRequest(userId, targetUserId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/unblock/{userId}/{targetUserId}")
    public ResponseEntity<Void> unblockPerson(
            @PathVariable("userId") int userId, @PathVariable("targetUserId") int targetUserId) {
        relationshipService.unblockPerson(userId, targetUserId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/unfriend/{userId}/{targetUserId}")
    public ResponseEntity<Void> unfriend(
            @PathVariable("userId") int userId, @PathVariable("targetUserId") int targetUserId) {
        relationshipService.unfriend(userId, targetUserId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping
    public ResponseEntity<List<RelationshipDTO>> getAllRelationships() {
        return new ResponseEntity<>(new ArrayList<RelationshipDTO>(relationshipService.findAllRelationships()), HttpStatus.OK);
    }

}

