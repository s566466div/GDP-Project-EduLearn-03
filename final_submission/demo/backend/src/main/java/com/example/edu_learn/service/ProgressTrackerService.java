package com.example.edu_learn.service;

import com.example.edu_learn.entity.Course;
import com.example.edu_learn.entity.ProgressTracker;
import com.example.edu_learn.entity.User;
import com.example.edu_learn.repository.CourseRepository;
import com.example.edu_learn.repository.ProgressTrackerRepository;
import com.example.edu_learn.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ProgressTrackerService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    private final ProgressTrackerRepository progressTrackerRepository;

    public ProgressTrackerService(ProgressTrackerRepository progressTrackerRepository) {
        this.progressTrackerRepository = progressTrackerRepository;
    }

    public ProgressTracker updateProgress(Long userId, Long courseId, int quizzes, int assignments, int materials, int videos) {
        ProgressTracker tracker = progressTrackerRepository.findByUserIdAndCourseId(userId, courseId)
            .orElse(new ProgressTracker());
        
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));    
        tracker.setUser(user);
        Course course = courseRepository.findById(courseId).orElseThrow(() -> new RuntimeException("Course not found"));
        tracker.setCourse(course);
        tracker.setQuizzesAttempted(tracker.getQuizzesAttempted() + quizzes);
        tracker.setAssignmentsAttempted(tracker.getAssignmentsAttempted() + assignments);
        tracker.setReadingMaterialsViewed(tracker.getReadingMaterialsViewed() + materials);
        tracker.setVideoLecturesWatched(tracker.getVideoLecturesWatched() + videos);
        
        int totalContent = tracker.getQuizzesAttempted() + tracker.getAssignmentsAttempted()
                         + tracker.getReadingMaterialsViewed() + tracker.getVideoLecturesWatched();
        tracker.setProgressPercentage((double) totalContent / calculateTotalCourseContent(courseId) * 100);
        tracker.setLastUpdated(LocalDateTime.now());
        
        return progressTrackerRepository.save(tracker);
    }

    private int calculateTotalCourseContent(Long courseId) {
        // Logic to calculate total content in the course based on quizzes, assignments, etc.
        // This should query the database using CourseContentRepository or similar
        return 100; // Placeholder value
    }
}
