package com.elte.kolhok.repository;

import com.elte.kolhok.model.Dorm;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DormRepository extends MongoRepository<Dorm, String> {

}
