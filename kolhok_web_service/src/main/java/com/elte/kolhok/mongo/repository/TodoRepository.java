package com.elte.kolhok.mongo.repository;

import com.elte.kolhok.mongo.model.Todo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TodoRepository extends MongoRepository<Todo, String> {

    public Optional<Todo> findById(String id);
    public List<Todo> findByUser(String user);
}
