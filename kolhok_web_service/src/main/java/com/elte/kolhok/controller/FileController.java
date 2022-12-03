package com.elte.kolhok.controller;

import com.elte.kolhok.model.File;
import com.elte.kolhok.model.PublicFileObject;
import com.elte.kolhok.model.ReportObject;
import com.elte.kolhok.repository.FileRepository;
import com.elte.kolhok.repository.PublicFileRepository;
import com.elte.kolhok.repository.ReportsRepository;
import com.elte.kolhok.resource.FileDataRequest;
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

    private final FileRepository fileRepository;
    private final PublicFileRepository publicFileRepository;
    private final ReportsRepository reportsRepository;

    public FileController(FileRepository fileRepository, PublicFileRepository publicFileRepository, ReportsRepository reportsRepository) {
        this.fileRepository = fileRepository;
        this.publicFileRepository = publicFileRepository;
        this.reportsRepository = reportsRepository;
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
            return ResponseEntity.status(HttpStatus.OK).body("Upload successful");
        }catch (Exception e){
            ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Upload failed");
        }
        return ResponseEntity.status(400).body("Could not save file");
    }

    @GetMapping("/api/file-data/")
    public ResponseEntity<?> getAllFileData() {
        List<FileDataRequest> fileDataRequests = new ArrayList<>();
        var files = fileRepository.findAll();
        for (File f: files) {
            FileDataRequest d = new FileDataRequest(f.getId(), f.getFileName(), f.getFileType());
            fileDataRequests.add(d);
        }
        return ResponseEntity.status(200).body(fileDataRequests);
    }
    @GetMapping("/api/file-data-reports/")
    public ResponseEntity<?> getAllReports() {
        Optional<ReportObject> object = reportsRepository.findAll().stream().findFirst();
        List<FileDataRequest> fileDataRequests = new ArrayList<>();
        if(object.isPresent()) {
            for (String name : object.get().getFileNames()) {
                File file = fileRepository.findByFileName(name);
                if(file != null) {
                    FileDataRequest request = new FileDataRequest(file.getId(), file.getFileName(), file.getFileType());
                    fileDataRequests.add(request);
                }
            }
            return ResponseEntity.ok(fileDataRequests);
        }
        return ResponseEntity.status(400).body("There are no reports to get.");
    }

    @GetMapping("/api/file-data-filter/")
    public ResponseEntity<?> getAllWithFilter() {
        Optional<PublicFileObject> object = publicFileRepository.findAll().stream().findFirst();
        List<FileDataRequest> fileDataRequests = new ArrayList<>();
        if(object.isPresent()) {
            var filesIter = fileRepository.findAll();
            var names = object.get().getFileNames();
            filesIter.forEach(x -> {
                for (var name : names) {
                    if(x.getFileName().equals(name)) {
                        FileDataRequest d = new FileDataRequest(x.getId(), x.getFileName(), x.getFileType());
                        fileDataRequests.add(d);
                    }
                }
            });
            return ResponseEntity.ok(fileDataRequests);
        }
        return ResponseEntity.status(400).body("There are no public files to get.");
    }

    @GetMapping("/api/file-get/{name}")
    public ResponseEntity<?> getFileByName(@PathVariable String name) {
        File result = fileRepository.findByFileName(name);

        byte[] fileBytes = Base64Utils.decodeFromString(result.getFileBytesAsString());
        ByteArrayResource resource = new ByteArrayResource(fileBytes);

        return ResponseEntity.ok().headers(this.headers(name))
                .contentLength(fileBytes.length)
                .contentType(ParseFileType(result.getFileType()))
                .body(resource);
    }

    @GetMapping("/api/file-get-id/{id}")
    public ResponseEntity<?> getFileById(@PathVariable String id) {
        Optional<File> rawFile = fileRepository.findById(id);
        if(rawFile.isPresent()) {
            byte[] fileBytes = Base64Utils.decodeFromString(rawFile.get().getFileBytesAsString());
            ByteArrayResource resource = new ByteArrayResource(fileBytes);
            return ResponseEntity.ok().headers(this.headers(rawFile.get().getFileName()))
                    .contentLength(fileBytes.length)
                    .contentType(ParseFileType(rawFile.get().getFileType()))
                    .body(resource);
        }
        return ResponseEntity.status(400).body("Could not get file with id {" + id + "} because it does not exist.");
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
        var file = fileRepository.findByFileName(name);

        if(file != null) {
            fileRepository.deleteById(file.getId());
        }

        return ResponseEntity.ok(name + "successfully deleted.");
    }

    @DeleteMapping("/api/file-delete-id/{id}")
    public ResponseEntity<?> deleteFileById(@PathVariable String id) {
        Optional<File> file = fileRepository.findById(id);

        if(file.isPresent()) {
            fileRepository.deleteById(id);
        }

        return ResponseEntity.ok("Successfully deleted.");
    }

    @PostMapping("/api/public-files")
    public ResponseEntity<?> overrideWithNew(@RequestBody String[] fileNames) {
        Optional<PublicFileObject> object = publicFileRepository.findAll().stream().findFirst();

        if(object.isPresent()) {
            publicFileRepository.deleteById(object.get().getId());
            PublicFileObject current = object.get();
            current.setFileNames(fileNames);
            publicFileRepository.save(current);
        }
        else {
            PublicFileObject current = new PublicFileObject(fileNames);
            publicFileRepository.save(current);
        }

        return ResponseEntity.ok("Stored successfully.");
    }

    @PostMapping("/api/public-reports")
    public ResponseEntity<?> overrideWithNewReport(@RequestBody String[] fileNames) {
        Optional<ReportObject> reportObject = reportsRepository.findAll().stream().findFirst();

        if(reportObject.isPresent()) {
            reportsRepository.deleteById(reportObject.get().getId());
            ReportObject current = reportObject.get();
            current.setFileNames(fileNames);
            reportsRepository.save(current);
        }
        else {
            ReportObject current = new ReportObject(fileNames);
            reportsRepository.save(current);
        }

        return ResponseEntity.ok("Stored successfully.");
    }
}
