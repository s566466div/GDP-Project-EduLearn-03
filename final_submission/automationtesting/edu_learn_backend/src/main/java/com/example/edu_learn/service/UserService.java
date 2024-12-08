package com.example.edu_learn.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.edu_learn.entity.User;
import com.example.edu_learn.repository.UserRepository;

// import io.jsonwebtoken.Claims;
// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.SignatureAlgorithm;
// import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    public User registerUser(User user) throws Exception {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new Exception("Email already registered");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public String authenticateUser(String email, String password, String role) throws Exception {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new Exception("Invalid credentials"));
        System.err.println(role);
        System.err.println(user.getRole());
        if (!passwordEncoder.matches(password, user.getPassword()) || !user.getRole().equals(role)) {
            throw new Exception("Invalid credentials");
        }
        // return jwtTokenProvider.createToken(email, user.getRole());
        return jwtTokenProvider.generateToken(customUserDetailsService.loadUserByUsername(email), user.getRole(), user.getId().toString());
    }

    // Method to get user role from JWT token
    public String getUserRoleFromToken(String token) {
        return jwtTokenProvider.getRoleFromToken(token);
    }

    // Method to get user role from JWT token
    public String getUserIdFromToken(String token) {
        return jwtTokenProvider.getIdFromToken(token);
    }

    // Create a new user
    public User createUser(User user) {
        return userRepository.save(user);
    }

    // Get a list of all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get a user by ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Update an existing user
    public Optional<User> updateUser(Long id, User updatedUser) {
        return userRepository.findById(id).map(existingUser -> {
            existingUser.setName(updatedUser.getName());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setRole(updatedUser.getRole());
            return userRepository.save(existingUser);
        });
    }

    // Delete a user by ID
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
