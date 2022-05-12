package com.elte.kolhok.controller;

import com.elte.kolhok.model.Post;
import com.elte.kolhok.repository.PostRepository;
import com.elte.kolhok.resource.PostRequest;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@EntityScan("com.elte.kolhok")
@EnableMongoRepositories("com.elte.kolhok.repository")
@CrossOrigin
public class PostController {

    private final PostRepository postRepository;

    public PostController(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @GetMapping("/api/posts")
    public ResponseEntity<?> getAllPosts() {
        return ResponseEntity.ok(postRepository.findAll());
    }

    @PostMapping("/api/post-create")
    public ResponseEntity<?> createPost(@RequestBody PostRequest postRequest) {
        Post post = new Post(postRequest.getAuthor(), postRequest.getTitle(), postRequest.getText(), postRequest.getPublicationDate());

        return ResponseEntity.status(201).body(postRepository.save(post));
    }

    @PostMapping("/api/post-update")
    public ResponseEntity<?> updatePost(@RequestBody PostRequest postRequest) {
        Optional<Post> post = postRepository.findById(postRequest.getId());

        if(post.isPresent()){
            postRepository.deleteById(post.get().getId());
            Post current = post.get();
            current.setAuthor(postRequest.getAuthor());
            current.setText(postRequest.getText());
            current.setPublicationDate(postRequest.getPublicationDate());
            return ResponseEntity.ok(postRepository.save(current));
        }

        return ResponseEntity.status(400).body("Post with id {" + post.get().getId() + "} can not be updated because it does not exist");
    }

    @GetMapping("/api/posts/{id}")
    public ResponseEntity<?> getPostById(@PathVariable String id) {
        Optional<Post> post = postRepository.findById(id);

        if(post.isPresent()) {
            return ResponseEntity.ok(post.get());
        }

        return ResponseEntity.status(400).body("The post with id {" + id + "} was not found");
    }

    @DeleteMapping("/api/todos/{id}")
    public ResponseEntity<?> deletePostById(@PathVariable String id) {
        Optional<Post> post = postRepository.findById(id);

        if(post.isPresent()){
            postRepository.deleteById(id);
            return ResponseEntity.ok("Success");
        }

        return ResponseEntity.status(400).body("The post with id {" + id + "} was not found");
    }
}
