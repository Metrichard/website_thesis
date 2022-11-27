package com.elte.kolhok.resource;

public class ContentRequest {

    private String id;
    private String content;

    public ContentRequest() {
    }

    public ContentRequest(String content) {
        this.content = content;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
