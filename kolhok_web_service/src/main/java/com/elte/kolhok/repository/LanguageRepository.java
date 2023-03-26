package com.elte.kolhok.repository;

import com.elte.kolhok.model.TextPiece;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface LanguageRepository extends PagingAndSortingRepository<TextPiece, String> {

    TextPiece findByTargetLanguage(String targetLanguage);
}
