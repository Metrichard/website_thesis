package com.elte.kolhok.controller;

import com.elte.kolhok.model.Contents;
import com.elte.kolhok.repository.ContentsRepository;
import com.elte.kolhok.resource.ContentRequest;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@EntityScan("com.elte.kolhok")
@CrossOrigin("*")
public class ContentsController {

    private final ContentsRepository contentsRepository;

    public ContentsController(ContentsRepository contentsRepository) {
        this.contentsRepository = contentsRepository;
    }

    @GetMapping("/api/contents-get")
    public ResponseEntity<?> getContents() {
        Optional<Contents> contents = contentsRepository.findAll().stream().findFirst();

        return contents.<ResponseEntity<?>>map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.ok(new Contents()));

    }

    @PostMapping("/api/contents-save")
    public ResponseEntity<?> saveContents(@RequestBody ContentRequest contentRequest) {
        Optional<Contents> contents = contentsRepository.findAll().stream().findFirst();

        contents.ifPresent(value -> contentsRepository.deleteById(value.getId()));

        Contents current = new Contents(contentRequest.getContent());
        return ResponseEntity.ok(contentsRepository.save(current));
    }
}
