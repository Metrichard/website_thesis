package com.elte.kolhok.controller;

import com.elte.kolhok.model.DocumentEntity;
import com.elte.kolhok.repository.DocumentRepository;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@RestController
@EntityScan("com.elte.kolhok")
@EnableMongoRepositories
@CrossOrigin
public class DocumentController {

    private final DocumentRepository documentRepository;

    public DocumentController(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    @PostMapping("/api/document-upload")
    public ResponseEntity<?> saveDocument(@RequestParam("file")MultipartFile file, Model model) throws IOException {
        File convertedFile = convertMultipartFileToFile(file);
        DocumentEntity entity = new DocumentEntity();
        entity.setDocument(convertedFile);
        entity.setDocType(file.getContentType());

        return ResponseEntity.ok(documentRepository.insert(entity));
    }

    private File convertMultipartFileToFile(MultipartFile file) throws IOException {
        File convertedFile = new File(file.getOriginalFilename());
        convertedFile.createNewFile();
        FileOutputStream fos = new FileOutputStream(convertedFile);
        fos.write(file.getBytes());
        fos.close();
        return convertedFile;
    }

//    @GetMapping("/api/documents")
//    public ResponseEntity<?> getDocuments() throws IllegalStateException, IOException {
//        GridFSFindIterable filesFromDB = gridFsTemplate.find(new Query(Criteria.where("_id").is("%")));
//        List<File> files = new ArrayList<>();
//        for (var file : filesFromDB) {
//            File temporary = new File(file);
//        }
//    }
}
