package com.elte.kolhok.controller;

import com.elte.kolhok.model.File;
import com.elte.kolhok.repository.FileRepository;
import com.elte.kolhok.resource.FileRequest;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@EntityScan("com.elte.kolhok")
@CrossOrigin("*")
public class FileController {

    private final FileRepository fileRepository;

    public FileController(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    @PostMapping("/api/file-upload")
    public ResponseEntity<?> fileUpload(@RequestBody FileRequest fileRequest) {
        File file = new File(fileRequest.getFile());

        return ResponseEntity.status(201).body(fileRepository.save(file));
    }
}
