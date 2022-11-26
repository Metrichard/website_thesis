package com.elte.kolhok.repository;

import com.elte.kolhok.model.PersPerson;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PresidencyRepository extends MongoRepository<PersPerson, String> {
}
