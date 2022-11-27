package com.elte.kolhok.repository;

import com.elte.kolhok.model.Contents;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContentsRepository extends MongoRepository<Contents, String> {
}
