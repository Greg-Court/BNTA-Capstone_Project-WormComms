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

    @PutMapping("/{id}/accept")
    public ResponseEntity<RelationshipDTO> acceptFriendRequest(@PathVariable int id) {
        return new ResponseEntity<>(new RelationshipDTO(relationshipService.acceptFriendRequest(id)), HttpStatus.OK);
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<Void> rejectFriendRequest(@PathVariable int id) {
        relationshipService.rejectFriendRequest(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}/block")
    public ResponseEntity<RelationshipDTO> blockFriend(@PathVariable int id) {
        return new ResponseEntity<>(new RelationshipDTO(relationshipService.blockFriend(id)), HttpStatus.OK);
    }

    @PutMapping("/{id}/unfriend")
    public ResponseEntity<Void> unfriend(@PathVariable int id) {
        relationshipService.unfriend(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

