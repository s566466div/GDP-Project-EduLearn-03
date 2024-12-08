package com.example.edu_learn.controller;

import com.example.edu_learn.controller.dto.QuizAttemptRequest;
import com.example.edu_learn.entity.QuestionAttempt;
import com.example.edu_learn.entity.QuizAttempt;
import com.example.edu_learn.service.QuizAttemptService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/quiz-attempts")
public class QuizAttemptController {

    private final QuizAttemptService quizAttemptService;

    public QuizAttemptController(QuizAttemptService quizAttemptService) {
        this.quizAttemptService = quizAttemptService;
    }

    /**
     * Save a new Quiz Attempt along with Question Attempts.
     * 
     * @param quizAttempt      The QuizAttempt entity containing details of the quiz attempt.
     * @param questionAttempts List of QuestionAttempt entities associated with the quiz attempt.
     * @return The saved QuizAttempt entity.
     */
    // @PostMapping("/save")
    // public ResponseEntity<QuizAttempt> saveQuizAttemptWithQuestions(
    //     @RequestBody QuizAttempt quizAttempt,
    //     @RequestBody List<QuestionAttempt> questionAttempts
    // ) {
    //     QuizAttempt savedAttempt = quizAttemptService.saveQuizAttemptWithQuestions(quizAttempt, questionAttempts);
    //     return ResponseEntity.ok(savedAttempt);
    // }
    @PostMapping("/save")
public ResponseEntity<QuizAttempt> saveQuizAttemptWithQuestions(@RequestBody QuizAttemptRequest quizAttemptRequest) {
    System.err.println(quizAttemptRequest);
    QuizAttempt savedAttempt = quizAttemptService.
    saveQuizAttemptWithQuestions(
        quizAttemptRequest.getQuizAttempt(),
        quizAttemptRequest.getQuestionAttempts()
    );
    return ResponseEntity.ok(savedAttempt);
}

    /**
     * Retrieve all Quiz Attempts made by a specific user.
     * 
     * @param userId The ID of the user.
     * @return A list of QuizAttempt entities.
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<QuizAttempt>> getQuizAttemptsByUser(@PathVariable Long userId) {
        List<QuizAttempt> attempts = quizAttemptService.getUserQuizAttempts(userId);
        return ResponseEntity.ok(attempts);
    }

    /**
     * Retrieve all Question Attempts associated with a specific Quiz Attempt.
     * 
     * @param quizAttemptId The ID of the quiz attempt.
     * @return A list of QuestionAttempt entities.
     */
    @GetMapping("/{quizAttemptId}/questions")
    public ResponseEntity<List<QuestionAttempt>> getQuestionsForQuizAttempt(@PathVariable Long quizAttemptId) {
        List<QuestionAttempt> questionAttempts = quizAttemptService.getQuestionAttemptsForQuizAttempt(quizAttemptId);
        return ResponseEntity.ok(questionAttempts);
    }

    /**
     * Update the score of a specific Quiz Attempt.
     * 
     * @param quizAttemptId The ID of the quiz attempt.
     * @param score         The updated score.
     * @return The updated QuizAttempt entity.
     */
    @PutMapping("/{quizAttemptId}/update-score")
    public ResponseEntity<QuizAttempt> updateQuizAttemptScore(
        @PathVariable Long quizAttemptId,
        @RequestParam Integer score
    ) {
        QuizAttempt updatedAttempt = quizAttemptService.updateQuizAttemptScore(quizAttemptId, score);
        return ResponseEntity.ok(updatedAttempt);
    }

    /**
     * Delete a specific Quiz Attempt.
     * 
     * @param quizAttemptId The ID of the quiz attempt to delete.
     * @return A success message.
     */
    @DeleteMapping("/{quizAttemptId}")
    public ResponseEntity<String> deleteQuizAttempt(@PathVariable Long quizAttemptId) {
        quizAttemptService.deleteQuizAttempt(quizAttemptId);
        return ResponseEntity.ok("Quiz Attempt deleted successfully.");
    }
}
