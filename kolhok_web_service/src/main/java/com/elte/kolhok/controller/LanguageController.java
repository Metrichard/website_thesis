package com.elte.kolhok.controller;

import com.elte.kolhok.model.TextPiece;
import com.elte.kolhok.repository.LanguageRepository;
import com.elte.kolhok.resource.TextPieceRequest;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@EntityScan("com.elte.kolhok")
@CrossOrigin("*")
public class LanguageController {

    private final LanguageRepository languageRepository;

    public LanguageController(LanguageRepository languageRepository) {
        this.languageRepository = languageRepository;
    }

    private ResponseEntity<?> CheckIfTermsAreMet(TextPieceRequest request){
        if (request.getTargetLanguage().isEmpty() || request.getTargetLanguage().isBlank()){
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Piece can not be saved, because target was not set.");
        }
        if (request.getFieldAndText().isEmpty()) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Piece can not be saved, because no text was provided.");
        }
        return null;
    }

    @GetMapping("/api/languages")
    public ResponseEntity<?> GetAllTextPieces() {
        return ResponseEntity.ok(languageRepository.findAll());
    }

    @GetMapping("/api/language-get/{targetLanguage}")
    public ResponseEntity<?> GetTextPiece(@PathVariable String targetLanguage){
        TextPiece piece = languageRepository.findByTargetLanguage(targetLanguage);

        return ResponseEntity.status(201).body(piece);
    }

    @PostMapping("/api/language-create")
    public ResponseEntity<?> CreateNewTextPiece(@RequestBody TextPieceRequest request){
        var check = CheckIfTermsAreMet(request);
        if (check != null){
            return check;
        }

        TextPiece piece = new TextPiece(request.getTargetLanguage(), request.getFieldAndText());
        return ResponseEntity.ok(languageRepository.save(piece));
    }

    @PatchMapping("/api/language-update")
    public ResponseEntity<?> UpdateTextPiece(@RequestBody TextPieceRequest request){
        var check = CheckIfTermsAreMet(request);
        if (check != null){
            return check;
        }

        Optional<TextPiece> piece = languageRepository.findById(request.getId());
        if (piece.isPresent()){
            languageRepository.deleteById(request.getId());
            TextPiece current = piece.get();
            current.setTargetLanguage(request.getTargetLanguage());
            current.setFieldAndText(request.getFieldAndText());
            return ResponseEntity.ok(languageRepository.save(current));
        }

        return ResponseEntity.status(400).body("Update failed because TextPiece with id {" + request.getId() + "} does not exist");
    }

    @DeleteMapping("/api/language-delete/{id}")
    public ResponseEntity<?> DeleteTextPiece(@PathVariable String id){
        Optional<TextPiece> piece = languageRepository.findById(id);

        if (piece.isPresent()){
            languageRepository.deleteById(id);
        }

        return ResponseEntity.ok().body("TextPiece with id {" + id + "} was successfully deleted.");
    }
}
