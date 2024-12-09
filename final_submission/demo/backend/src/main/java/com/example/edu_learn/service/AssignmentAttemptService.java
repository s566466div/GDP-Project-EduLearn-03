package com.example.edu_learn.service;

import com.example.edu_learn.entity.AssignmentAttempt;
import com.example.edu_learn.repository.AssignmentAttemptRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AssignmentAttemptService {

    private final AssignmentAttemptRepository assignmentAttemptRepository;

    public AssignmentAttemptService(AssignmentAttemptRepository assignmentAttemptRepository) {
        this.assignmentAttemptRepository = assignmentAttemptRepository;
    }

    public AssignmentAttempt saveAssignmentAttempt(AssignmentAttempt assignmentAttempt) {
        assignmentAttempt.setAttemptTime(LocalDateTime.now());
        return assignmentAttemptRepository.save(assignmentAttempt);
    }
}
