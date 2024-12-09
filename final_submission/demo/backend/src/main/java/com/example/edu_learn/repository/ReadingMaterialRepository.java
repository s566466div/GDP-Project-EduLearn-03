package com.example.edu_learn.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.edu_learn.entity.ReadingMaterial;


@Repository
public interface ReadingMaterialRepository extends JpaRepository<ReadingMaterial, Long> {
    List<ReadingMaterial> findByCourseId(Long courseId);
}