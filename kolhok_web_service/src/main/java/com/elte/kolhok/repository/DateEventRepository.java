package com.elte.kolhok.repository;

import com.elte.kolhok.model.DateEvent;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DateEventRepository extends MongoRepository<DateEvent, String> {
}
