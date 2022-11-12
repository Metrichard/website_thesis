package com.elte.kolhok.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("files")
public class File {

    @Id
    private String id;
    private String fileName;
    private String fileBytesAsString;
    private String fileType;

    public File() {
    }

    public File(String fileName, String fileBytesAsString, String fileType) {
        this.fileName = fileName;
        this.fileBytesAsString = fileBytesAsString;
        this.fileType = fileType;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFileBytesAsString() {
        return fileBytesAsString;
    }

    public void setFileBytesAsString(String fileBytesAsString) {
        this.fileBytesAsString = fileBytesAsString;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }
}
