package com.elte.kolhok.repository;

import com.elte.kolhok.model.File;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FileRepository extends MongoRepository<File, String> {
}
