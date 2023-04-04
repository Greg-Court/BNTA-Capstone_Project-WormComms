package com.bnta.wormcomms.services;

import com.bnta.wormcomms.models.Relationship;
import com.bnta.wormcomms.models.RelationshipDTO;
import com.bnta.wormcomms.models.User;
import com.bnta.wormcomms.repositories.RelationshipRepo;
import com.bnta.wormcomms.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.management.relation.Relation;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RelationshipService {

    @Autowired
    private RelationshipRepo friendRepository;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private RelationshipRepo relationshipRepository;

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

    public Relationship blockFriend(int userId, int targetUserId) {
        Optional<Relationship> optionalRelationship = friendRepository.findByUser1_IdAndUser2_Id(userId, targetUserId);
        Relationship relationship;

        if (optionalRelationship.isPresent()) {
            relationship = optionalRelationship.get();
        } else {
            relationship = new Relationship();
            relationship.setUser1(userRepository.findById(userId).get());
            relationship.setUser2(userRepository.findById(targetUserId).get());
        }

        relationship.setStatus(Relationship.Status.BLOCKED);
        return friendRepository.save(relationship);
    }

    public void unblockPerson(int userId, int targetUserId) {
        Optional<Relationship> optionalRelationship = friendRepository.findByUser1_IdAndUser2_Id(userId, targetUserId);
        if (optionalRelationship.isPresent()) {
            Relationship relationship = optionalRelationship.get();
            if (relationship.getStatus() == Relationship.Status.BLOCKED) {
                friendRepository.delete(relationship);
                System.out.println("RELATIONSHIP DELETED!!!");
            } else {
                throw new RuntimeException("The relationship is not blocked.");
            }
        } else {
            throw new RuntimeException("Relationship not found.");
        }
    }

    public Relationship acceptFriendRequest(int userId, int targetUserId) {
        Optional<Relationship> optionalRelationship = friendRepository.findByUser1_IdAndUser2_Id(userId, targetUserId);
        if (optionalRelationship.isPresent()) {
            Relationship relationship = optionalRelationship.get();
            if (relationship.getStatus() == Relationship.Status.PENDING) {
                relationship.setStatus(Relationship.Status.FRIEND);
                return friendRepository.save(relationship);
            } else {
                throw new RuntimeException("The relationship is not pending.");
            }
        } else {
            throw new RuntimeException("Relationship not found.");
        }
    }

    public void cancelFriendRequest(int userId, int targetUserId) {
        Optional<Relationship> optionalRelationship = friendRepository.findByUser1_IdAndUser2_Id(userId, targetUserId);
        if (optionalRelationship.isPresent()) {
            Relationship relationship = optionalRelationship.get();
            if (relationship.getStatus() == Relationship.Status.PENDING) {
                friendRepository.delete(relationship);
                System.out.println("FRIEND REQUEST CANCELED!!!");
            } else {
                throw new RuntimeException("The relationship is not pending.");
            }
        } else {
            throw new RuntimeException("Relationship not found.");
        }
    }

    public void rejectFriendRequest(int userId, int targetUserId) {
        Optional<Relationship> optionalRelationship = friendRepository.findByUser1_IdAndUser2_Id(userId, targetUserId);
        if (optionalRelationship.isPresent()) {
            Relationship relationship = optionalRelationship.get();
            if (relationship.getStatus() == Relationship.Status.PENDING) {
                friendRepository.delete(relationship);
                System.out.println("FRIEND REQUEST REJECTED!!!");
            } else {
                throw new RuntimeException("The relationship is not pending.");
            }
        } else {
            throw new RuntimeException("Relationship not found.");
        }
    }

    public void unfriend(int userId, int targetUserId) {
        Optional<Relationship> optionalRelationship = friendRepository.findByUser1_IdAndUser2_Id(userId, targetUserId);
        if (optionalRelationship.isPresent()) {
            Relationship relationship = optionalRelationship.get();
            if (relationship.getStatus() == Relationship.Status.FRIEND) {
                friendRepository.delete(relationship);
                System.out.println("UNFRIENDED!!!");
            } else {
                throw new RuntimeException("The relationship is not friends.");
            }
        } else {
            throw new RuntimeException("Relationship not found.");
        }
    }

    public List<RelationshipDTO> findAllRelationships() {
        List<Relationship> relationships = relationshipRepository.findAll();
        List<RelationshipDTO> relationshipDTOs = new ArrayList<>();
        for (Relationship relationship : relationships) {
            RelationshipDTO relationshipDTO = new RelationshipDTO(relationship);
            relationshipDTOs.add(relationshipDTO);
        }
        return relationshipDTOs;
    }

}