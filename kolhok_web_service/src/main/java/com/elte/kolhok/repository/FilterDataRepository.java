package com.elte.kolhok.repository;

import com.elte.kolhok.model.FilterData;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FilterDataRepository extends MongoRepository<FilterData, String> {
}
