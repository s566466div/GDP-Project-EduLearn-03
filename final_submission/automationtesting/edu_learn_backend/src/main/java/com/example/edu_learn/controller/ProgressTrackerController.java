package com.example.edu_learn.controller;

import com.example.edu_learn.entity.ProgressTracker;
import com.example.edu_learn.service.ProgressTrackerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/progress")
public class ProgressTrackerController {

    private final ProgressTrackerService progressTrackerService;

    public ProgressTrackerController(ProgressTrackerService progressTrackerService) {
        this.progressTrackerService = progressTrackerService;
    }

    @PostMapping("/update")
    public ResponseEntity<ProgressTracker> updateProgress(
        @RequestParam Long userId,
        @RequestParam Long courseId,
        @RequestParam int quizzes,
        @RequestParam int assignments,
        @RequestParam int materials,
        @RequestParam int videos
    ) {
        ProgressTracker tracker = progressTrackerService.updateProgress(userId, courseId, quizzes, assignments, materials, videos);
        return ResponseEntity.ok(tracker);
    }
}
