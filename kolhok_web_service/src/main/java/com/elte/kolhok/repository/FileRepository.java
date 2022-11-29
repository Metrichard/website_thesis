package com.elte.kolhok.repository;

import com.elte.kolhok.model.File;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface FileRepository extends PagingAndSortingRepository<File, String> {
    File findByFileName(String fileName);
}
