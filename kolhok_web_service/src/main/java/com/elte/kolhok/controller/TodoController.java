package com.elte.kolhok.controller;

import com.elte.kolhok.model.Todo;
import com.elte.kolhok.repository.TodoRepository;
import com.elte.kolhok.resource.TodoRequest;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@EntityScan("com.elte.kolhok")
@EnableMongoRepositories("com.elte.kolhok.repository")
public class TodoController {


    private final TodoRepository todoRepository;

    public TodoController(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @GetMapping("/todos")
    public ResponseEntity<?> getAllTodos() {
        return ResponseEntity.ok(todoRepository.findAll());
    }

    @PostMapping("/todo")
    public ResponseEntity<?> createProduct(@RequestBody TodoRequest todoRequest) {

        Todo todo = new Todo();
        todo.setUser(todoRequest.getUser());
        todo.setDescription(todoRequest.getDescription());
        todo.setDueDate(todoRequest.getDueDate());
        todo.setDone(todoRequest.isDone());

        return ResponseEntity.status(201).body(todoRepository.save(todo));
    }

    @GetMapping("/todos/{id}")
    public ResponseEntity<?> getProductById(@PathVariable String id) {
        Optional<Todo> todo = todoRepository.findById(id);

        if(todo.isPresent()) {
            return ResponseEntity.ok(todo.get());
        }

        return ResponseEntity.ok("The todo with id {" + id + "} was not found");
    }

    @DeleteMapping("/todos/{id}")
    public ResponseEntity<?> deleteTodoById(@PathVariable String id) {
        Optional<Todo> todo = todoRepository.findById(id);

        if(todo.isPresent()) {
            todoRepository.deleteById(id);
            return ResponseEntity.ok("Success");
        }

        return ResponseEntity.ok("The todo with id {" + id + "} was not found");
    }
}
