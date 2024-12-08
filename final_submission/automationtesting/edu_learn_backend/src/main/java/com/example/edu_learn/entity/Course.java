package com.example.edu_learn.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.Set;
import java.util.List;
import java.util.ArrayList;
// import org.hibernate.mapping.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "courses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = {"instructor", "students", "quizzes", "assignments", "readingMaterials", "videoLectures"})
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String subject;

    @ManyToOne
    // @JsonBackReference
    @JoinColumn(name = "instructor_id")
    private User instructor;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Quiz> quizzes = new ArrayList<>();

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Assignment> assignments = new ArrayList<>();

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ReadingMaterial> readingMaterials = new ArrayList<>();

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<VideoLecture> videoLectures = new ArrayList<>();

    // @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    // private List<CourseContent> contents = new ArrayList<>();

    @ManyToMany(mappedBy = "enrolledCourses")
    private Set<User> students;
}