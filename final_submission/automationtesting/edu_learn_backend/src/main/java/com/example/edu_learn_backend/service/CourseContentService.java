package com.example.edu_learn_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.edu_learn_backend.repository.CourseContentRepository;
import com.example.edu_learn_backend.entity.CourseContent;

import java.util.List;
import java.util.Optional;

@Service
public class CourseContentService {
    @Autowired
    private CourseContentRepository courseContentRepository;

    public List<CourseContent> getCourseContents(Long courseId) {
        return courseContentRepository.findByCourseId(courseId);
    }

    public Optional<CourseContent> getContentById(Long contentId) {
        Optional<CourseContent> courseContent = courseContentRepository.findById(contentId);
        return courseContent;
    }
}