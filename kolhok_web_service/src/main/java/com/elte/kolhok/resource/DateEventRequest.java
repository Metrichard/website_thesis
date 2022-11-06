package com.elte.kolhok.resource;

public class DateEventRequest {

    private String id;
    private String title;
    private String date;
    private String color;

    public DateEventRequest() {
    }

    public DateEventRequest(String title, String date, String color) {
        this.title = title;
        this.date = date;
        this.color = color;
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

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}
