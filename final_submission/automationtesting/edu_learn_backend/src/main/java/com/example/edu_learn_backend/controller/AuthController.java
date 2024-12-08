package com.example.edu_learn_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.edu_learn_backend.entity.User;
import com.example.edu_learn_backend.service.UserService;
import com.example.edu_learn_backend.controller.dto.LoginRequest;
import com.example.edu_learn_backend.controller.dto.AuthResponse;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        // System.err.println("auth controller register");
        try {
            // throw new Exception("Email already registered");
            User registeredUser = userService.registerUser(user);
            return ResponseEntity.ok(registeredUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            System.out.println(loginRequest.getEmail());
            System.out.println(loginRequest.getPassword());
            String token = userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());
            return ResponseEntity.ok(new AuthResponse(token));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}