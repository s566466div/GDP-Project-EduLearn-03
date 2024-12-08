package com.example.edu_learn.entity;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "video_lectures")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VideoLecture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    @JsonBackReference
    private Course course;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String filePath;

    @Column(length = 1000) // Set a reasonable max length for summary
    private String summary;

    @Column(name = "series_number")
    private Integer seriesNumber;

}
