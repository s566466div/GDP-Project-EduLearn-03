package com.example.edu_learn_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.edu_learn_backend.entity.Course;
import com.example.edu_learn_backend.entity.User;
import com.example.edu_learn_backend.repository.CourseRepository;
import com.example.edu_learn_backend.repository.UserRepository;

import java.util.*;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    public Page<Course> getCourses(Specification<Course> spec, Pageable pageable) {
        return courseRepository.findAll(spec, pageable);
    }

    public Optional<Course> getCourseById(Long id) {
        return courseRepository.findById(id);
    }

    public Course createCourse(Course course, Long instructorId) {
        User instructor = userRepository.findById(instructorId).orElseThrow(() -> new RuntimeException("Instructor not found"));
        course.setInstructor(instructor);
        return courseRepository.save(course);
    }

    public Course enrollInCourse(Long courseId, Long studentId) {
        Course course = courseRepository.findById(courseId).orElseThrow(() -> new RuntimeException("Course not found"));
        User student = userRepository.findById(studentId).orElseThrow(() -> new RuntimeException("Student not found"));
        course.getStudents().add(student);
        student.getEnrolledCourses().add(course);
        userRepository.save(student);
        return courseRepository.save(course);
    }
}
