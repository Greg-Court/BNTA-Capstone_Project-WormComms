package com.bnta.wormcomms.controllers;

import com.bnta.wormcomms.models.Relationship;
import com.bnta.wormcomms.models.RelationshipDTO;
import com.bnta.wormcomms.services.FriendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/relationships")
public class FriendController {
    @Autowired
    private FriendService friendService;

    @PostMapping
    public ResponseEntity<RelationshipDTO> createFriend(@RequestBody Relationship relationship) {
        return new ResponseEntity<>(new RelationshipDTO(friendService.createFriend(relationship)), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<RelationshipDTO>> getUserFriends(@PathVariable int id) {
        return new ResponseEntity<>(new ArrayList<RelationshipDTO>(friendService.findAllFriendsByUserId(id)), HttpStatus.OK);
    }

    @PutMapping("/{id}/accept")
    public ResponseEntity<RelationshipDTO> acceptFriendRequest(@PathVariable int id) {
        return new ResponseEntity<>(new RelationshipDTO(friendService.acceptFriendRequest(id)), HttpStatus.OK);
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<Void> rejectFriendRequest(@PathVariable int id) {
        friendService.rejectFriendRequest(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}/block")
    public ResponseEntity<RelationshipDTO> blockFriend(@PathVariable int id) {
        return new ResponseEntity<>(new RelationshipDTO(friendService.blockFriend(id)), HttpStatus.OK);
    }

    @PutMapping("/{id}/unfriend")
    public ResponseEntity<Void> unfriend(@PathVariable int id) {
        friendService.unfriend(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

