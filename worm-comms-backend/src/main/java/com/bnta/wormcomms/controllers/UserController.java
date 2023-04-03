package com.bnta.wormcomms.controllers;

import com.bnta.wormcomms.models.User;
import com.bnta.wormcomms.models.UserDTO;
import com.bnta.wormcomms.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Integer id) {
        return userService.getUserById(id);
    }

    @PostMapping
    public User createUser(@RequestBody Map<String, String> userData) {
        User user = new User();
        user.setUsername(userData.get("username"));
        user.setPassword(userData.get("password"));
        user.setFirstName(userData.get("first-name"));
        user.setLastName(userData.get("last-name"));
        user.setEmail(userData.get("emailaddress"));
        user.setRelationships(new ArrayList<>());
        // set other fields
        return userService.saveUser(user);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable int id, @RequestBody Map<String, String> userData) {
        User user = getUserById(id);
        user.setUsername(userData.get("username"));
        user.setPassword(userData.get("newpassword"));
        user.setFirstName(userData.get("first-name"));
        user.setLastName(userData.get("last-name"));
        user.setEmail(userData.get("emailaddress"));
        user.setBio(userData.get("bio"));
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}