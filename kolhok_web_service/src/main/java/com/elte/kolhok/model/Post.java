package com.elte.kolhok.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document("posts")
public class Post {

    @Id
    private String id;
    private String title;
    private String author;
    private String text;
    private String tag;
    private String isPinned;
    private String isHidden;
    private Date publicationDate;
    private String[] files;

    public Post() {
    }

    public Post(String title, String author, String text, String tag, String isPinned, String isHidden, Date publicationDate, String[] files) {
        this.title = title;
        this.author = author;
        this.text = text;
        this.tag = tag;
        this.isPinned = isPinned;
        this.isHidden = isHidden;
        this.publicationDate = publicationDate;
        this.files = files;
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

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getIsPinned() {
        return isPinned;
    }

    public void setIsPinned(String isPinned) {
        this.isPinned = isPinned;
    }

    public String getIsHidden() {
        return isHidden;
    }

    public void setIsHidden(String isHidden) {
        this.isHidden = isHidden;
    }

    public Date getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(Date publicationDate) {
        this.publicationDate = publicationDate;
    }

    public String[] getFiles() {
        return files;
    }

    public void setFiles(String[] files) {
        this.files = files;
    }
}
