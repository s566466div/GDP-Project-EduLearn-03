package com.example.edu_learn.controller.dto;

import com.example.edu_learn.entity.QuestionAttempt;
import com.example.edu_learn.entity.QuizAttempt;

import java.util.List;

public class QuizAttemptRequest {

    private QuizAttempt quizAttempt;
    private List<QuestionAttempt> questionAttempts;

    // Getters and Setters
    public QuizAttempt getQuizAttempt() {
        // System.err.println();
        return quizAttempt;
    }

    public void setQuizAttempt(QuizAttempt quizAttempt) {
        this.quizAttempt = quizAttempt;
    }

    public List<QuestionAttempt> getQuestionAttempts() {
        return questionAttempts;
    }

    public void setQuestionAttempts(List<QuestionAttempt> questionAttempts) {
        this.questionAttempts = questionAttempts;
    }
}
