package com.example.edu_learn.controller.dto;

public class AuthResponse {
    private String token;
    private String role;
    private String id;

    public AuthResponse(String token, String role, String id) {
        this.token = token;
        this.role = role;
        this.id = id;
    }

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public String getRole() {
        return role;
    }

    public String getId() {
        return id;
    }
}