package com.example.edu_learn_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.example.edu_learn_backend.entity.Course;
import com.example.edu_learn_backend.entity.CourseContent;
import com.example.edu_learn_backend.entity.User;
import com.example.edu_learn_backend.security.UserDetailsImpl;
import com.example.edu_learn_backend.service.CourseContentService;
import com.example.edu_learn_backend.service.CourseService;
import com.example.edu_learn_backend.service.CourseSpecification;
import com.example.edu_learn_backend.service.CustomUserDetailsService;

import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;
    
    @Autowired
    private CourseContentService courseContentService;

    @GetMapping
    public Page<Course> getCourses(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String subject,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Specification<Course> spec = Specification.where(null);
        if (title != null) {
            spec = spec.and(CourseSpecification.hasTitle(title));
        }
        if (subject != null) {
            spec = spec.and(CourseSpecification.hasSubject(subject));
        }

        Pageable pageable = PageRequest.of(page, size);
        return courseService.getCourses(spec, pageable);
    }

    @GetMapping("/{id}")
    public Optional<Course> getCourseById(@PathVariable Long id) {
        return courseService.getCourseById(id);
    }

    @PostMapping
    public Course createCourse(@RequestBody Course course, Authentication authentication) {
        // UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        // if (!userDetails.getRole().equals("INSTRUCTOR")) {
        //     throw new RuntimeException("Only instructors can create courses");
        // }
        // UserDetails userDetails = customUserDetailsService.loadUserByUsername("test1@gmail.com");
        return courseService.createCourse(course, 1L);
    }

    @PostMapping("/{courseId}/enroll")
    public Course enrollInCourse(@PathVariable Long courseId, Authentication authentication) {
        // UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        // if (!userDetails.getRole().equals("STUDENT")) {
        //     throw new RuntimeException("Only students can enroll in courses");
        // }
        return courseService.enrollInCourse(courseId, 2L);
    }

    @GetMapping("/{courseId}/contents")
    public ResponseEntity<List<CourseContent>> getCourseContents(@PathVariable Long courseId) {
        List<CourseContent> contents = courseContentService.getCourseContents(courseId);
        return ResponseEntity.ok(contents);
    }

    @GetMapping("/contents/{contentId}")
    public ResponseEntity<Optional<CourseContent>> getCourseContent(@PathVariable Long contentId) {
        Optional<CourseContent> content = courseContentService.getContentById(contentId);
        return ResponseEntity.ok(content);
    }
}
