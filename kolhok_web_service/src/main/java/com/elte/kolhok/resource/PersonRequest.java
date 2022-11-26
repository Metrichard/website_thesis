package com.elte.kolhok.resource;

public class PersonRequest {

    private String id;
    private String name;
    private String title;
    private String emails;
    private String fileName;

    public PersonRequest() {
    }

    public PersonRequest(String name, String title, String emails, String fileName) {
        this.name = name;
        this.title = title;
        this.emails = emails;
        this.fileName = fileName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getEmails() {
        return emails;
    }

    public void setEmails(String emails) {
        this.emails = emails;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
}
