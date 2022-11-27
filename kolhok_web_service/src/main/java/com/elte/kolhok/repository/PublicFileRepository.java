package com.elte.kolhok.repository;

import com.elte.kolhok.model.PublicFileObject;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PublicFileRepository extends MongoRepository<PublicFileObject, String> {
}
