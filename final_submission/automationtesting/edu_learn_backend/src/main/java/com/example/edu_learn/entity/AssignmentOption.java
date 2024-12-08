package com.example.edu_learn.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "assignment_options")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssignmentOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "assignment_question_id", nullable = false)
    @JsonIgnore
    private AssignmentQuestion assignmentQuestion;

    @Column(nullable = false)
    private String optionText;

    @Column(nullable = false)
    private boolean isCorrect;
}
