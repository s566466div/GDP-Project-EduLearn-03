package com.example.edu_learn.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.edu_learn.entity.VideoLecture;


@Repository
public interface VideoLectureRepository extends JpaRepository<VideoLecture, Long> {
    List<VideoLecture> findByCourseId(Long courseId);
}