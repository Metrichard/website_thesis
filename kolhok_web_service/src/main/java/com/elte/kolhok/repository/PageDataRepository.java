package com.elte.kolhok.repository;

import com.elte.kolhok.model.PageData;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PageDataRepository extends MongoRepository<PageData, String> {
}
