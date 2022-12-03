package com.elte.kolhok.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("reports")
public class ReportObject {

    @Id
    private String id;
    private String[] fileNames;

    public ReportObject() {
    }

    public ReportObject(String[] fileNames) {
        this.fileNames = fileNames;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String[] getFileNames() {
        return fileNames;
    }

    public void setFileNames(String[] fileNames) {
        this.fileNames = fileNames;
    }
}
