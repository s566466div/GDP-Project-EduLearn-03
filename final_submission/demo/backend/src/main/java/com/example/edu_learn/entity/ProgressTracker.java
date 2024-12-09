package com.example.edu_learn.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class ProgressTracker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    private int quizzesAttempted;
    private int assignmentsAttempted;
    private int readingMaterialsViewed;
    private int videoLecturesWatched;
    private double progressPercentage;

    private LocalDateTime lastUpdated;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public int getQuizzesAttempted() {
        return quizzesAttempted;
    }

    public void setQuizzesAttempted(int quizzesAttempted) {
        this.quizzesAttempted = quizzesAttempted;
    }

    public int getAssignmentsAttempted() {
        return assignmentsAttempted;
    }

    public void setAssignmentsAttempted(int assignmentsAttempted) {
        this.assignmentsAttempted = assignmentsAttempted;
    }

    public int getReadingMaterialsViewed() {
        return readingMaterialsViewed;
    }

    public void setReadingMaterialsViewed(int readingMaterialsViewed) {
        this.readingMaterialsViewed = readingMaterialsViewed;
    }

    public int getVideoLecturesWatched() {
        return videoLecturesWatched;
    }

    public void setVideoLecturesWatched(int videoLecturesWatched) {
        this.videoLecturesWatched = videoLecturesWatched;
    }

    public double getProgressPercentage() {
        return progressPercentage;
    }

    public void setProgressPercentage(double progressPercentage) {
        this.progressPercentage = progressPercentage;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}
