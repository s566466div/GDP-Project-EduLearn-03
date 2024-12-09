package com.example.edu_learn.repository;

import com.example.edu_learn.entity.ProgressTracker;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProgressTrackerRepository extends JpaRepository<ProgressTracker, Long> {
    Optional<ProgressTracker> findByUserIdAndCourseId(Long userId, Long courseId);
}
