package com.elte.kolhok.controller;

import com.elte.kolhok.model.File;
import com.elte.kolhok.repository.FileRepository;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@EntityScan("com.elte.kolhok")
@CrossOrigin("*")
public class FileController {


    private List<String> files = new ArrayList<>();
    //private final Path rootLocation = Paths.get("");
    private final FileRepository fileRepository;

    public FileController(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    @PostMapping("/api/file-upload")
    public ResponseEntity<?> fileUpload(@RequestParam("file") MultipartFile fileRequest) {
        try {
            try{
                byte[] fileBytes = fileRequest.getBytes();
                String base64 = Base64Utils.encodeToString(fileBytes);
                String ext = fileRequest.getOriginalFilename().substring(fileRequest.getOriginalFilename().lastIndexOf('.'));
                File file = new File(fileRequest.getOriginalFilename(), base64, ext);
                fileRepository.save(file);
            }
            catch(Exception e){
                throw new RuntimeException("FAIL!");
            }
            files.add(fileRequest.getOriginalFilename());
            return ResponseEntity.status(HttpStatus.OK).body("Upload successful");
        }catch (Exception e){
            ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Upload failed");
        }
        return ResponseEntity.status(400).body("Could not save file");
    }

    @GetMapping("/api/file-get/{name}")
    public ResponseEntity<?> getFileByName(@PathVariable String name) {
        File result = new File();
        var files = fileRepository.findAll();
        for (var f : files) {
            if (f.getFileName().equals(name)) {
                result = f;
                break;
            }
        }

        byte[] fileBytes = Base64Utils.decodeFromString(result.getFileBytesAsString());
        ByteArrayResource resource = new ByteArrayResource(fileBytes);

        return ResponseEntity.ok().headers(this.headers(name))
                .contentLength(fileBytes.length)
                .contentType(ParseFileType(result.getFileType()))
                .body(resource);
    }

    @GetMapping("/api/file-get-id/{id}")
    public ResponseEntity<?> getFileById(@PathVariable String id) {
        return ResponseEntity.ok(fileRepository.findById(id));
    }

    private MediaType ParseFileType(String ext) {
        return switch (ext) {
            case ".pdf" -> MediaType.APPLICATION_PDF;
            case ".jpg", ".jpeg" -> MediaType.IMAGE_JPEG;
            case ".png" -> MediaType.IMAGE_PNG;
            case ".docx" -> MediaType.APPLICATION_OCTET_STREAM;
            case ".xlsx" -> MediaType.APPLICATION_XML;
            default -> MediaType.ALL;
        };
    }

    private HttpHeaders headers(String name) {
        HttpHeaders header = new HttpHeaders();
        header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + name);
        header.add("Cache-Control", "no-cache, no-store, must-revalidate");
        header.add("Pragma", "no-cache");
        header.add("Expires", "0");
        return header;
    }

    @DeleteMapping("/api/file-delete/{name}")
    public ResponseEntity<?> deleteFileByName(@PathVariable String name) {
        var files = fileRepository.findAll();
        for (var f : files) {
            if (f.getFileName().equals(name)) {
                fileRepository.deleteById(f.getId());
                break;
            }
        }
        return ResponseEntity.ok(name + "successfully deleted.");
    }

    @DeleteMapping("/api/file-delete/{id}")
    public ResponseEntity<?> deleteFileById(@PathVariable String id) {
        Optional<File> file = fileRepository.findById(id);

        if(file.isPresent()) {
            fileRepository.deleteById(id);
        }

        return ResponseEntity.ok("Successfully deleted.");
    }
}
