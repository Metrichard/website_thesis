package com.elte.kolhok.repository;

import com.elte.kolhok.model.Tag;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TagRepository extends MongoRepository<Tag, String> {
}
