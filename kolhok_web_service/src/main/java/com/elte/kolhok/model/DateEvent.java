package com.elte.kolhok.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("dateEvent")
public class DateEvent {

    @Id
    private String id;
    private String title;
    private String date;
    private String description;

    public DateEvent() {
    }

    public DateEvent(String title, String date, String color) {
        this.title = title;
        this.date = date;
        this.description = color;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
