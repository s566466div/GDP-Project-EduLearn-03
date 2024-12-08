package com.example.edu_learn_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.edu_learn_backend.entity.CourseContent;
import java.util.List;

public interface CourseContentRepository extends JpaRepository<CourseContent, Long> {
    List<CourseContent> findByCourseId(Long courseId);
}