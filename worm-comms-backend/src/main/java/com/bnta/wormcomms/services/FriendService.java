package com.bnta.wormcomms.services;

import com.bnta.wormcomms.models.Relationship;
import com.bnta.wormcomms.models.RelationshipDTO;
import com.bnta.wormcomms.repositories.FriendRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FriendService {

    @Autowired
    private FriendRepo friendRepository;

    public Relationship createFriend(Relationship relationship) {
        return friendRepository.save(relationship);
    }

    public Optional<Relationship> findFriendById(int id) {
        return friendRepository.findById(id);
    }

    public List<RelationshipDTO> findAllFriendsByUserId(int userId) {
        List<Relationship> relationships = friendRepository.findAllByUser1_Id(userId);
        List<RelationshipDTO> relationshipDTOS = new ArrayList<>();

        for (Relationship relationship : relationships) {
            relationshipDTOS.add(new RelationshipDTO(relationship));
        }

        return relationshipDTOS;
    }

    public Relationship acceptFriendRequest(int id) {
        Relationship relationship = findFriendById(id).orElseThrow(() -> new RuntimeException("Friend request not found"));
        relationship.setStatus(Relationship.Status.FRIEND);
        return friendRepository.save(relationship);
    }

    public void rejectFriendRequest(int id) {
        Relationship relationship = findFriendById(id).orElseThrow(() -> new RuntimeException("Friend request not found"));
        friendRepository.delete(relationship);
    }

    public Relationship blockFriend(int id) {
        Relationship relationship = findFriendById(id).orElseThrow(() -> new RuntimeException("Friend not found"));
        relationship.setStatus(Relationship.Status.BLOCKED);
        return friendRepository.save(relationship);
    }

    public void unfriend(int id) {
        Relationship relationship = findFriendById(id).orElseThrow(() -> new RuntimeException("Friend not found"));
        friendRepository.delete(relationship);
    }
}