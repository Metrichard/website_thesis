package com.elte.kolhok.resource;

import java.util.Date;

public class PostRequest {

    private String id;
    private String title;
    private String author;
    private String text;
    private String tag;
    private String isPinned;
    private String isHidden;
    private Date publicationDate;

    public PostRequest() {
    }

    public PostRequest(String title, String author, String text, String tag, String isPinned, String isHidden, Date publicationDate) {
        this.title = title;
        this.author = author;
        this.text = text;
        this.tag = tag;
        this.isPinned = isPinned;
        this.isHidden = isHidden;
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

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getPinned() {
        return isPinned;
    }

    public void setPinned(String pinned) {
        isPinned = pinned;
    }

    public String getHidden() {
        return isHidden;
    }

    public void setHidden(String hidden) {
        isHidden = hidden;
    }
}
