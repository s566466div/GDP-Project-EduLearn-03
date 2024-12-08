package com.example.edu_learn.service;

import com.example.edu_learn.entity.QuestionAttempt;
import com.example.edu_learn.entity.QuizAttempt;
import com.example.edu_learn.repository.QuestionAttemptRepository;
import com.example.edu_learn.repository.QuizAttemptRepository;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class QuizAttemptService {

    private final QuizAttemptRepository quizAttemptRepository;
    private final QuestionAttemptRepository questionAttemptRepository;

    public QuizAttemptService(QuizAttemptRepository quizAttemptRepository, QuestionAttemptRepository questionAttemptRepository) {
        this.quizAttemptRepository = quizAttemptRepository;
        this.questionAttemptRepository = questionAttemptRepository;
    }

    /**
     * Saves a QuizAttempt along with associated QuestionAttempts.
     * 
     * @param quizAttempt      The QuizAttempt entity to save.
     * @param questionAttempts The list of QuestionAttempt entities to associate.
     * @return The saved QuizAttempt entity.
     */
    // public QuizAttempt saveQuizAttemptWithQuestions(QuizAttempt quizAttempt, List<QuestionAttempt> questionAttempts) {
    //     quizAttempt.setAttemptTime(LocalDateTime.now());

    //     questionAttempts.forEach(questionAttempt -> questionAttempt.setQuizAttempt(quizAttempt));
    //     quizAttempt.setQuestionAttempts(questionAttempts);

    //     questionAttemptRepository.saveAll(questionAttempts);
    //     return quizAttemptRepository.save(quizAttempt);
    // }
    @org.springframework.transaction.annotation.Transactional
    public QuizAttempt saveQuizAttemptWithQuestions(QuizAttempt quizAttempt, List<QuestionAttempt> questionAttempts) {
        // Save the QuizAttempt first
        quizAttempt.setAttemptTime(LocalDateTime.now());
        QuizAttempt savedQuizAttempt = quizAttemptRepository.save(quizAttempt);
    
        // Link the saved QuizAttempt to each QuestionAttempt
        questionAttempts.forEach(questionAttempt -> questionAttempt.setQuizAttempt(savedQuizAttempt));
    
        // Save all QuestionAttempt entities
        questionAttemptRepository.saveAll(questionAttempts);
    
        // Return the saved QuizAttempt with associated QuestionAttempts
        savedQuizAttempt.setQuestionAttempts(questionAttempts);
        return savedQuizAttempt;
    }

    /**
     * Retrieves all QuizAttempts made by a specific user.
     * 
     * @param userId The ID of the user.
     * @return A list of QuizAttempt entities.
     */
    public List<QuizAttempt> getUserQuizAttempts(Long userId) {
        return quizAttemptRepository.findByUserId(userId);
    }

    /**
     * Retrieves all QuestionAttempts for a specific QuizAttempt.
     * 
     * @param quizAttemptId The ID of the quiz attempt.
     * @return A list of QuestionAttempt entities.
     */
    public List<QuestionAttempt> getQuestionAttemptsForQuizAttempt(Long quizAttemptId) {
        Optional<QuizAttempt> quizAttempt = quizAttemptRepository.findById(quizAttemptId);
        if (quizAttempt.isPresent()) {
            return quizAttempt.get().getQuestionAttempts();
        }
        throw new IllegalArgumentException("QuizAttempt not found with ID: " + quizAttemptId);
    }

    /**
     * Updates the score of a specific QuizAttempt.
     * 
     * @param quizAttemptId The ID of the quiz attempt.
     * @param score         The new score to update.
     * @return The updated QuizAttempt entity.
     */
    public QuizAttempt updateQuizAttemptScore(Long quizAttemptId, Integer score) {
        Optional<QuizAttempt> quizAttemptOpt = quizAttemptRepository.findById(quizAttemptId);
        if (quizAttemptOpt.isPresent()) {
            QuizAttempt quizAttempt = quizAttemptOpt.get();
            quizAttempt.setScore(score);
            return quizAttemptRepository.save(quizAttempt);
        }
        throw new IllegalArgumentException("QuizAttempt not found with ID: " + quizAttemptId);
    }

    /**
     * Deletes a QuizAttempt by its ID.
     * 
     * @param quizAttemptId The ID of the quiz attempt to delete.
     */
    public void deleteQuizAttempt(Long quizAttemptId) {
        if (quizAttemptRepository.existsById(quizAttemptId)) {
            quizAttemptRepository.deleteById(quizAttemptId);
        } else {
            throw new IllegalArgumentException("QuizAttempt not found with ID: " + quizAttemptId);
        }
    }
}
