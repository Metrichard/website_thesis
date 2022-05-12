package com.elte.kolhok.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.File;
import java.util.Date;

@Document
public class DocumentEntity {

    @Id
    private String id;
    private String docType;
    @CreatedDate
    private Date created;
    private File document;

    public DocumentEntity() {
    }

    public DocumentEntity(String docType, Date created, File document) {
        this.docType = docType;
        this.created = created;
        this.document = document;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDocType() {
        return docType;
    }

    public void setDocType(String docType) {
        this.docType = docType;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public File getDocument() {
        return document;
    }

    public void setDocument(File document) {
        this.document = document;
    }
}
