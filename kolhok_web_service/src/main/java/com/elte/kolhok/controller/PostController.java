package com.elte.kolhok.controller;

import com.elte.kolhok.model.Post;
import com.elte.kolhok.repository.PostRepository;
import com.elte.kolhok.resource.PostRequest;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@EntityScan("com.elte.kolhok")
@EnableMongoRepositories("com.elte.kolhok.repository")
@CrossOrigin("*")
public class PostController {

    private final PostRepository postRepository;

    public PostController(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @GetMapping("/api/posts")
    public ResponseEntity<?> getAllPosts() {
        return ResponseEntity.ok(postRepository.findAll());
    }

    @GetMapping("/api/posts-w-tag/{tag}")
    public ResponseEntity<?> getAllPostsBasedOnFilter(@PathVariable String tag) {
        var posts = postRepository.findAll();
        var filteredPosts = posts.stream().filter(p -> p.getTag().equals(tag) && !Boolean.parseBoolean(p.getIsPinned()) && !Boolean.parseBoolean(p.getIsHidden()));
        return ResponseEntity.ok(filteredPosts.toArray());
    }

    @GetMapping("/api/post-pinned/")
    public ResponseEntity<?> getPinnedPost() {
        List<Post> posts = postRepository.findAll().stream().toList();
        Optional<Post> pinned = posts.stream().filter(x -> Boolean.parseBoolean(x.getIsPinned())).findFirst();
        return pinned.<ResponseEntity<?>>map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.ok(new Post("", "", "", "", "", "", new Date(), new String[0])));
    }

    @PostMapping("/api/post-create")
    public ResponseEntity<?> createPost(@RequestBody PostRequest postRequest) {
        Post post = new Post(postRequest.getTitle(), postRequest.getAuthor(), postRequest.getText(), postRequest.getTag(), postRequest.getIsPinned(),  postRequest.getIsHidden(), postRequest.getPublicationDate(), postRequest.getFiles());

        if(Boolean.parseBoolean(post.getIsPinned())) {
            List<Post> posts = postRepository.findAll();
            posts.forEach((x) -> {
                x.setIsPinned("false");
            });
            postRepository.saveAll(posts);
        }
        return ResponseEntity.status(201).body(postRepository.save(post));
    }

    @PostMapping("/api/post-update")
    public ResponseEntity<?> updatePost(@RequestBody PostRequest postRequest) {
        Optional<Post> post = postRepository.findById(postRequest.getId());

        if(post.isPresent()){

            if(Boolean.parseBoolean(post.get().getIsPinned())) {
                List<Post> posts = postRepository.findAll();
                posts.forEach((x) -> {
                    x.setIsPinned("false");
                });
                postRepository.saveAll(posts);
            }

            postRepository.deleteById(post.get().getId());
            Post current = post.get();
            current.setAuthor(postRequest.getAuthor());
            current.setText(postRequest.getText());
            current.setPublicationDate(postRequest.getPublicationDate());
            current.setIsPinned(postRequest.getIsPinned());
            current.setIsHidden(postRequest.getIsHidden());
            current.setFiles(postRequest.getFiles());
            current.setTag(postRequest.getTag());
            return ResponseEntity.ok(postRepository.save(current));
        }

        return ResponseEntity.status(400).body("Post with id {" + postRequest.getId() + "} can not be updated because it does not exist");
    }

    @GetMapping("/api/posts/{id}")
    public ResponseEntity<?> getPostById(@PathVariable String id) {
        Optional<Post> post = postRepository.findById(id);

        if(post.isPresent()) {
            return ResponseEntity.ok(post.get());
        }

        return ResponseEntity.status(400).body("The post with id {" + id + "} was not found");
    }

    @DeleteMapping("/api/post-delete/{id}")
    public ResponseEntity<?> deletePostById(@PathVariable String id) {
        Optional<Post> post = postRepository.findById(id);

        if(post.isPresent()){
            postRepository.deleteById(id);
            return ResponseEntity.ok("Success");
        }

        return ResponseEntity.status(400).body("The post with id {" + id + "} was not found");
    }
}
