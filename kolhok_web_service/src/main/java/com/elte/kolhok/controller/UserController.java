package com.elte.kolhok.controller;

import com.elte.kolhok.model.User;
import com.elte.kolhok.repository.UserRepository;
import com.elte.kolhok.resource.UserRequest;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@EntityScan("com.elte.kolhok")
@CrossOrigin("*")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/api/register")
    public ResponseEntity<?> register(@RequestBody UserRequest userRequest) {
        User user = new User(userRequest.getUsername(), userRequest.getPassword());
        return ResponseEntity.ok(userRepository.save(user));
    }
    @GetMapping("/api/get-all-users")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.status(200).body(userRepository.findAll());
    }

    @DeleteMapping("/api/delete-user/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok(id + " deleted successfully");
    }
}
