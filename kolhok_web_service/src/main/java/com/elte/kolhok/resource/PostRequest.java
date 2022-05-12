package com.elte.kolhok.resource;

import java.util.Date;

public class PostRequest {

    private String id;
    private String title;
    private String author;
    private String text;
    private Date publicationDate;

    public PostRequest() {
    }

    public PostRequest(String author, String title, String text, Date publicationDate) {
        this.author = author;
        this.title = title;
        this.text = text;
        this.publicationDate = publicationDate;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Date getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(Date publicationDate) {
        this.publicationDate = publicationDate;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
