package com.bnta.wormcomms.controllers;

import com.bnta.wormcomms.models.Friend;
import com.bnta.wormcomms.models.FriendDTO;
import com.bnta.wormcomms.services.FriendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/friends")
public class FriendController {
    @Autowired
    private FriendService friendService;

    @PostMapping
    public ResponseEntity<FriendDTO> createFriend(@RequestBody Friend friend) {
        return new ResponseEntity<>(new FriendDTO(friendService.createFriend(friend)), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<FriendDTO>> getUserFriends(@PathVariable int id) {
        return new ResponseEntity<>(new ArrayList<FriendDTO>(friendService.findAllFriendsByUserId(id)), HttpStatus.OK);
    }

    @PutMapping("/{id}/accept")
    public ResponseEntity<FriendDTO> acceptFriendRequest(@PathVariable int id) {
        return new ResponseEntity<>(new FriendDTO(friendService.acceptFriendRequest(id)), HttpStatus.OK);
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<Void> rejectFriendRequest(@PathVariable int id) {
        friendService.rejectFriendRequest(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}/block")
    public ResponseEntity<FriendDTO> blockFriend(@PathVariable int id) {
        return new ResponseEntity<>(new FriendDTO(friendService.blockFriend(id)), HttpStatus.OK);
    }

    @PutMapping("/{id}/unfriend")
    public ResponseEntity<Void> unfriend(@PathVariable int id) {
        friendService.unfriend(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

