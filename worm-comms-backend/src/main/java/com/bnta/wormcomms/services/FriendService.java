package com.bnta.wormcomms.services;

import com.bnta.wormcomms.models.Friend;
import com.bnta.wormcomms.models.FriendDTO;
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

    public Friend createFriend(Friend friend) {
        return friendRepository.save(friend);
    }

    public Optional<Friend> findFriendById(int id) {
        return friendRepository.findById(id);
    }

    public List<FriendDTO> findAllFriendsByUserId(int userId) {
        List<Friend> friends = friendRepository.findAllByUser1_Id(userId);
        List<FriendDTO> friendDTOs = new ArrayList<>();

        for (Friend friend : friends) {
            friendDTOs.add(new FriendDTO(friend));
        }

        return friendDTOs;
    }

    public Friend acceptFriendRequest(int id) {
        Friend friend = findFriendById(id).orElseThrow(() -> new RuntimeException("Friend request not found"));
        friend.setStatus(Friend.Status.FRIEND);
        return friendRepository.save(friend);
    }

    public void rejectFriendRequest(int id) {
        Friend friend = findFriendById(id).orElseThrow(() -> new RuntimeException("Friend request not found"));
        friendRepository.delete(friend);
    }

    public Friend blockFriend(int id) {
        Friend friend = findFriendById(id).orElseThrow(() -> new RuntimeException("Friend not found"));
        friend.setStatus(Friend.Status.BLOCKED);
        return friendRepository.save(friend);
    }

    public void unfriend(int id) {
        Friend friend = findFriendById(id).orElseThrow(() -> new RuntimeException("Friend not found"));
        friendRepository.delete(friend);
    }
}