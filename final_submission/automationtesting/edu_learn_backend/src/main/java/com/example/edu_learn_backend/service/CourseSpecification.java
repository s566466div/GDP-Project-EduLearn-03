package com.example.edu_learn_backend.service;


import org.springframework.data.jpa.domain.Specification;
import com.example.edu_learn_backend.entity.Course;

public class CourseSpecification {
    public static Specification<Course> hasTitle(String title) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("title"), "%" + title + "%");
    }

    public static Specification<Course> hasSubject(String subject) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("subject"), subject);
    }
}
