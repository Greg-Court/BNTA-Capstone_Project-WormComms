package com.bnta.wormcomms.services;

import com.bnta.wormcomms.models.*;
import com.bnta.wormcomms.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepository;

    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserDTO> userDTOs = new ArrayList<>();
        for (User user : users) {
            UserDTO userDTO = new UserDTO(user);
            userDTOs.add(userDTO);
        }
        return userDTOs;
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(int id, User user) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setUsername(user.getUsername());
            existingUser.setEmail(user.getEmail());
            return userRepository.save(existingUser);
        }
        throw new NoSuchElementException("User not found");
    }

    public List<FriendDTO> getFriendsForUser(int userId) {
        Optional<User> user = userRepository.findById(userId);
        List<Friend> friends = user.get().getFriends();
        List<FriendDTO> friendDTOs = new ArrayList<>();
        for (Friend friend : friends) {
            FriendDTO friendDTO = new FriendDTO(friend);
            friendDTOs.add(friendDTO);
        }
        return friendDTOs;
    }


    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    public User getUserById(int id) {
        return userRepository.findById(id).get();
    }
}