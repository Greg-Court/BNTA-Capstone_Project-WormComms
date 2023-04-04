package com.bnta.wormcomms.controllers;

import com.bnta.wormcomms.models.User;
import com.bnta.wormcomms.models.UserDTO;
import com.bnta.wormcomms.services.FileStorageService;
import com.bnta.wormcomms.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private FileStorageService fileStorageService;


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
        user.setFirstName(userData.get("firstName"));
        user.setLastName(userData.get("lastName"));
        user.setEmail(userData.get("emailaddress"));
        user.setRelationships(new ArrayList<>());
        // set other fields
        return userService.saveUser(user);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public User updateUser(@PathVariable int id,
                           @RequestParam("username") String username,
                           @RequestParam("emailaddress") String emailaddress,
                           @RequestParam("password") String newPassword,
                           @RequestParam("firstName") String firstName,
                           @RequestParam("lastName") String lastName,
                           @RequestParam("bio") String bio,
                           @RequestPart("profilePicture") MultipartFile profilePicture)  {
        User user = getUserById(id);
        user.setUsername(username);
        user.setPassword(newPassword);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(emailaddress);
        user.setBio(bio);

        String fileUploadPath = fileStorageService.getFileUploadPath();

        try {
            if (profilePicture != null && !profilePicture.isEmpty()) {
                String fileName = profilePicture.getOriginalFilename();
                Path path = Paths.get(fileUploadPath, fileName);
                Files.write(path, profilePicture.getBytes());
                user.setProfilePicture(fileName); // or user.setProfilePicture(path.toString());
            }
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }


        return userService.updateUser(id, user);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}