package com.example.edu_learn.entity;

import java.util.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "assignment_questions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssignmentQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "assignment_id", nullable = false)
    @JsonIgnore
    private Assignment assignment;

    @Column(nullable = false)
    private String questionText;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuestionType questionType;

    @OneToMany(mappedBy = "assignmentQuestion", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AssignmentOption> options = new ArrayList<>();

    public enum QuestionType {
        SHORT_ANSWER,
        LONG_ANSWER,
        MULTIPLE_CHOICE,
        SINGLE_ANSWER
    }
}
