package com.elte.kolhok.repository;

import com.elte.kolhok.model.PublicFileObject;
import com.elte.kolhok.model.ReportObject;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReportsRepository extends MongoRepository<ReportObject, String> {
}
