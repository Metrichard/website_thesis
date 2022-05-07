package com.elte.kolhok.mongo.controller;

import com.elte.kolhok.mongo.model.Todo;
import com.elte.kolhok.mongo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Date;

@Controller
@CrossOrigin
public class TodoController {

    private TodoRepository todoRepository;

    @Autowired
    public TodoController(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }


    @PostMapping("add-todos")
    public ResponseEntity<?> addTodos() {
        todoRepository.save(new Todo("meth", "Learn to dance", new Date(), false));
        todoRepository.save(new Todo("meth", "Learn to suck", new Date(), false));
        return ResponseEntity.ok(true);
    }
}
