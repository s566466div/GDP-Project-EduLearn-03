package com.example.edu_learn_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "course_content")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseContent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ContentType contentType;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String filePath;

    public enum ContentType {
        VIDEO_LECTURE,
        READING_MATERIAL,
        QUIZZES,
        ASSIGNMENTS
    }
    
}
   