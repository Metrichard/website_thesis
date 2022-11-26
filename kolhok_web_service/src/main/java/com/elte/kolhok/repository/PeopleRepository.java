package com.elte.kolhok.repository;

import com.elte.kolhok.model.Person;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PeopleRepository extends MongoRepository<Person, String> {
}
