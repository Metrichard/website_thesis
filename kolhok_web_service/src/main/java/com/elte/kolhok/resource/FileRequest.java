package com.elte.kolhok.resource;

import org.springframework.web.multipart.MultipartFile;

public class FileRequest {

    private String id;
    private MultipartFile file;

    public FileRequest() {
    }

    public FileRequest(String id, MultipartFile file) {
        this.id = id;
        this.file = file;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }
}
