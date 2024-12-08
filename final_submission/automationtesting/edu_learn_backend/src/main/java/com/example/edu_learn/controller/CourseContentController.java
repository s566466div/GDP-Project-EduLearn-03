package com.example.edu_learn.controller;

import com.example.edu_learn.entity.*;
import com.example.edu_learn.service.CourseContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/contents/{courseId}")
public class CourseContentController {

    @Autowired
    private CourseContentService courseContentService;

    // ===== Quizzes =====

    @GetMapping("/quizzes")
    public ResponseEntity<List<Quiz>> getQuizzes(@PathVariable Long courseId) {
        List<Quiz> quizzes = courseContentService.getQuizzesByCourseId(courseId);
        return ResponseEntity.ok(quizzes);
    }

    @PostMapping("/quizzes")
    public ResponseEntity<Quiz> addQuiz(@PathVariable Long courseId, @RequestBody Quiz quiz) {
        Quiz savedQuiz = courseContentService.addQuizToCourse(courseId, quiz);
        return ResponseEntity.ok(savedQuiz);
    }

    @DeleteMapping("/quizzes/{quizId}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable Long quizId) {
        courseContentService.deleteQuiz(quizId);
        return ResponseEntity.noContent().build();
    }

    // ===== Assignments =====

    @GetMapping("/assignments")
    public ResponseEntity<List<Assignment>> getAssignments(@PathVariable Long courseId) {
        List<Assignment> assignments = courseContentService.getAssignmentsByCourseId(courseId);
        return ResponseEntity.ok(assignments);
    }

    @PostMapping("/assignments")
    public ResponseEntity<Assignment> addAssignment(@PathVariable Long courseId, @RequestBody Assignment assignment) {
        Assignment savedAssignment = courseContentService.addAssignmentToCourse(courseId, assignment);
        return ResponseEntity.ok(savedAssignment);
    }

    @DeleteMapping("/assignments/{assignmentId}")
    public ResponseEntity<Void> deleteAssignment(@PathVariable Long assignmentId) {
        courseContentService.deleteAssignment(assignmentId);
        return ResponseEntity.noContent().build();
    }

    // ===== Reading Materials =====

    @GetMapping("/reading-materials")
    public ResponseEntity<List<ReadingMaterial>> getReadingMaterials(@PathVariable Long courseId) {
        List<ReadingMaterial> readingMaterials = courseContentService.getReadingMaterialsByCourseId(courseId);
        return ResponseEntity.ok(readingMaterials);
    }

    // @PostMapping("/reading-materials")
    // public ResponseEntity<ReadingMaterial> addReadingMaterial(@PathVariable Long courseId, @RequestBody ReadingMaterial readingMaterial) {
    //     ReadingMaterial savedReadingMaterial = courseContentService.addReadingMaterialToCourse(courseId, readingMaterial);
    //     return ResponseEntity.ok(savedReadingMaterial);
    // }

    // Add reading material with file upload
    @PostMapping(value = "/reading-materials", consumes = { "multipart/form-data" })
    public ResponseEntity<ReadingMaterial> addReadingMaterial(
            @PathVariable Long courseId,
            @RequestParam("title") String title,
            @RequestParam("file") MultipartFile file) {
        try {
            ReadingMaterial savedReadingMaterial = courseContentService.addReadingMaterialToCourse(courseId, title, file);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedReadingMaterial);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/reading-materials/{readingMaterialId}")
    public ResponseEntity<Void> deleteReadingMaterial(@PathVariable Long readingMaterialId) {
        courseContentService.deleteReadingMaterial(readingMaterialId);
        return ResponseEntity.noContent().build();
    }

    // ===== Video Lectures =====

    @GetMapping("/video-lectures")
    public ResponseEntity<List<VideoLecture>> getVideoLectures(@PathVariable Long courseId) {
        List<VideoLecture> videoLectures = courseContentService.getVideoLecturesByCourseId(courseId);
        return ResponseEntity.ok(videoLectures);
    }

    // @PostMapping("/video-lectures")
    // public ResponseEntity<VideoLecture> addVideoLecture(@PathVariable Long courseId, @RequestBody VideoLecture videoLecture) {
    //     VideoLecture savedVideoLecture = courseContentService.addVideoLectureToCourse(courseId, videoLecture);
    //     return ResponseEntity.ok(savedVideoLecture);
    // }
    @PostMapping(value = "/video-lectures", consumes = { "multipart/form-data" })
    public ResponseEntity<VideoLecture> addVideoLecture(
        @PathVariable Long courseId,
        @RequestParam("title") String title,
        @RequestParam("summary") String summary,
        @RequestParam("seriesNumber") String seriesNumber,
        @RequestParam("file") MultipartFile file
    ) {
        try {
            VideoLecture savedVideoLecture = courseContentService.addVideoLectureToCourse(courseId, title, summary, seriesNumber, file);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedVideoLecture);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/video-lectures/{videoLectureId}")
    public ResponseEntity<Void> deleteVideoLecture(@PathVariable Long videoLectureId) {
        courseContentService.deleteVideoLecture(videoLectureId);
        return ResponseEntity.noContent().build();
    }
}
