package com.elte.kolhok.controller;

import com.elte.kolhok.model.Tag;
import com.elte.kolhok.repository.TagRepository;
import com.elte.kolhok.resource.TagRequest;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@EntityScan("com.elte.kolhok")
@CrossOrigin("*")
public class TagController {

    private final TagRepository tagRepository;

    public TagController(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    @GetMapping("/api/tags")
    public ResponseEntity<?> getAllTags() {
        return ResponseEntity.ok(tagRepository.findAll());
    }

    @PostMapping("/api/tag-create")
    public ResponseEntity<?> createTag(@RequestBody TagRequest tagRequest) {
        Tag tag = new Tag(tagRequest.getName(), tagRequest.getDescription());

        return ResponseEntity.status(201).body(tagRepository.save(tag));
    }

    @DeleteMapping("/api/tag-delete/{id}")
    public ResponseEntity<?> deleteTag(@PathVariable String id){
        Optional<Tag> tag = tagRepository.findById(id);

        if(tag.isPresent()) {
            tagRepository.deleteById(id);
        }

        return ResponseEntity.ok("Success");
    }

}
