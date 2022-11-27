package com.elte.kolhok.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("page-data")
public class PageData {

    @Id
    private String id;
    private String pageName;
    private String messageTitle;
    private String message;
    private String[] fileNames;

    public PageData() {
    }

    public PageData(String pageName, String messageTitle, String message, String[] fileNames) {
        this.pageName = pageName;
        this.messageTitle = messageTitle;
        this.message = message;
        this.fileNames = fileNames;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPageName() {
        return pageName;
    }

    public void setPageName(String pageName) {
        this.pageName = pageName;
    }

    public String getMessageTitle() {
        return messageTitle;
    }

    public void setMessageTitle(String messageTitle) {
        this.messageTitle = messageTitle;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String[] getFileNames() {
        return fileNames;
    }

    public void setFileNames(String[] fileNames) {
        this.fileNames = fileNames;
    }
}
