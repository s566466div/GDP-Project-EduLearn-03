package com.example.edu_learn.controller;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FileController {
     private final String videoLectureStoragePath = "/storage/videoLectures";
     private final String readingMaterialStoragePath = "/storage/readingMaterials";

    @GetMapping("/reading-materials/{fileName}")
    public ResponseEntity<Resource> downloadReadingMaterial(@PathVariable String fileName) {
        try {
            Path filePath = Paths.get(readingMaterialStoragePath).resolve(fileName);
            Resource resource = new UrlResource(filePath.toUri());
            System.out.println("File path: " + filePath.toString());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                throw new RuntimeException("File not found or not readable");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error serving file: " + fileName, e);
        }
    }

    @GetMapping("/videos/{fileName}")
    public ResponseEntity<Resource> serveVideo(@PathVariable String fileName) {
        try {
            Path filePath = Paths.get(videoLectureStoragePath).resolve(fileName);
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                throw new RuntimeException("File not found or not readable");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error serving file: " + fileName, e);
        }
    }
}
