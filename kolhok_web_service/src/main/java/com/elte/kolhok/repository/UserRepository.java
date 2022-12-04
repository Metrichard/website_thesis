package com.elte.kolhok.repository;

import com.elte.kolhok.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}
