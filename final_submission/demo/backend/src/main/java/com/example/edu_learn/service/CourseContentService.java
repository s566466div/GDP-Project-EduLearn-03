package com.example.edu_learn.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.edu_learn.repository.AssignmentRepository;
import com.example.edu_learn.repository.CourseContentRepository;
import com.example.edu_learn.repository.CourseRepository;
import com.example.edu_learn.repository.QuizRepository;
import com.example.edu_learn.repository.ReadingMaterialRepository;
import com.example.edu_learn.repository.VideoLectureRepository;
import com.example.edu_learn.entity.Assignment;
import com.example.edu_learn.entity.AssignmentOption;
import com.example.edu_learn.entity.AssignmentQuestion;
import com.example.edu_learn.entity.Course;
import com.example.edu_learn.entity.CourseContent;
import com.example.edu_learn.entity.Option;
import com.example.edu_learn.entity.Question;
import com.example.edu_learn.entity.Quiz;
import com.example.edu_learn.entity.ReadingMaterial;
import com.example.edu_learn.entity.VideoLecture;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class CourseContentService {
    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CourseContentRepository courseContentRepository;

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private ReadingMaterialRepository readingMaterialRepository;

    @Autowired
    private VideoLectureRepository videoLectureRepository;

    private final String readingMaterialStoragePath = "/storage/readingMaterials";
    private final String videoLectureStoragePath = "/storage/videoLectures";

    private String saveFile(MultipartFile file, String type) throws IOException {
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        String basePath = "/storage/etc";
        if (type.equals("rm")) {
            basePath = readingMaterialStoragePath;
        } else {
            basePath = videoLectureStoragePath;
        }
        Path filePath = Paths.get(basePath, fileName);

        Files.createDirectories(filePath.getParent()); // Ensure the directory exists
        Files.write(filePath, file.getBytes());

        return fileName;
    }


    public List<CourseContent> getCourseContents(Long courseId) {
        return courseContentRepository.findByCourseId(courseId);
    }

    public Optional<CourseContent> getContentById(Long contentId) {
        Optional<CourseContent> courseContent = courseContentRepository.findById(contentId);
        return courseContent;
    }

    // Quizzes
    public List<Quiz> getQuizzesByCourseId(Long courseId) {
        return quizRepository.findByCourseId(courseId);
    }

    public Quiz addQuizToCourse(Long courseId, Quiz quiz) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found with ID: " + courseId));
        quiz.setCourse(course);
        for (Question question : quiz.getQuestions()) {
            question.setQuiz(quiz); // Ensure each question references the parent quiz
            for (Option option : question.getOptions()) {
                option.setQuestion(question); // Ensure each option references the parent question
            }
        }
        return quizRepository.save(quiz);
    }

    public void deleteQuiz(Long quizId) {
        quizRepository.deleteById(quizId);
    }


    // Assignments
    public List<Assignment> getAssignmentsByCourseId(Long courseId) {
        return assignmentRepository.findByCourseId(courseId);
    }

    public Assignment addAssignmentToCourse(Long courseId, Assignment assignment) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found with ID: " + courseId));
        assignment.setCourse(course);
        for (AssignmentQuestion question : assignment.getQuestions()) {
            question.setAssignment(assignment);
            for (AssignmentOption option : question.getOptions()) {
                option.setAssignmentQuestion(question);
            }
        }
        return assignmentRepository.save(assignment);
    }

    public void deleteAssignment(Long assignmentId) {
        assignmentRepository.deleteById(assignmentId);
    }

    // Reading Materials
    public List<ReadingMaterial> getReadingMaterialsByCourseId(Long courseId) {
        return readingMaterialRepository.findByCourseId(courseId);
    }

    // public ReadingMaterial addReadingMaterialToCourse(Long courseId, ReadingMaterial readingMaterial) {
    //     Course course = courseRepository.findById(courseId)
    //             .orElseThrow(() -> new RuntimeException("Course not found with ID: " + courseId));
    //     readingMaterial.setCourse(course);
    //     return readingMaterialRepository.save(readingMaterial);
    // }

    public ReadingMaterial addReadingMaterialToCourse(Long courseId, String title, MultipartFile file) throws IOException {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found with ID: " + courseId));

        String fileName = saveFile(file, "rm");
        ReadingMaterial readingMaterial = new ReadingMaterial();
        readingMaterial.setCourse(course);
        readingMaterial.setTitle(title);
        readingMaterial.setFilePath(fileName); // Stores only the file name or relative path

        return readingMaterialRepository.save(readingMaterial);
    }

    // public void deleteReadingMaterial(Long readingMaterialId) {
    //     readingMaterialRepository.deleteById(readingMaterialId);
    // }

    public void deleteReadingMaterial(Long readingMaterialId) {
        ReadingMaterial readingMaterial = readingMaterialRepository.findById(readingMaterialId)
                .orElseThrow(() -> new RuntimeException("Reading material not found with ID: " + readingMaterialId));

        Path filePath = Paths.get(readingMaterialStoragePath, readingMaterial.getFilePath());
        try {
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete file associated with reading material ID: " + readingMaterialId, e);
        }

        readingMaterialRepository.deleteById(readingMaterialId);
    }

    // Video Lectures
    public List<VideoLecture> getVideoLecturesByCourseId(Long courseId) {
        return videoLectureRepository.findByCourseId(courseId);
    }

    // public VideoLecture addVideoLectureToCourse(Long courseId, VideoLecture videoLecture) {
    //     Course course = courseRepository.findById(courseId)
    //             .orElseThrow(() -> new RuntimeException("Course not found with ID: " + courseId));
    //     videoLecture.setCourse(course);
    //     return videoLectureRepository.save(videoLecture);
    // }

    public VideoLecture addVideoLectureToCourse(
        Long courseId, 
        String title, 
        String summary,
        String seriesNumber,
        MultipartFile file) throws IOException {
            Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found with ID: " + courseId));
            String fileName = saveFile(file, "vl");
            VideoLecture videoLecture = new VideoLecture();
            videoLecture.setCourse(course);
            videoLecture.setTitle(title);
            videoLecture.setSummary(summary);
            videoLecture.setSeriesNumber(Integer.parseInt(seriesNumber));
            videoLecture.setFilePath(fileName);

            return videoLectureRepository.save(videoLecture);
        }

    public void deleteVideoLecture(Long videoLectureId) {
        VideoLecture videoLecture = videoLectureRepository.findById(videoLectureId)
            .orElseThrow(() -> new RuntimeException("Video lecture not found with ID: " + videoLectureId));

        Path filePath = Paths.get(videoLectureStoragePath, videoLecture.getFilePath());
        try {
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete file associated with video lecture ID: " + videoLectureId, e);
        }    
        videoLectureRepository.deleteById(videoLectureId);
    }


}