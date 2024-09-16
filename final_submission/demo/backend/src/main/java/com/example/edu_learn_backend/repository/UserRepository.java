package com.example.edu_learn_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.edu_learn_backend.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}