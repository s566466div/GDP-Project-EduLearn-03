package com.example.edu_learn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.example.edu_learn.entity.Course;

public interface CourseRepository extends JpaRepository<Course, Long>, JpaSpecificationExecutor<Course>{
    
}
