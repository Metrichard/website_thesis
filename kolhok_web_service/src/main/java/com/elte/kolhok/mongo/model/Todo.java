package com.elte.kolhok.mongo.model;

import org.springframework.data.annotation.Id;

import java.util.Date;

public class Todo {

    @Id
    public String id;

    public String user;
    public String description;
    public Date dueDate;
    public boolean isDone;

    public Todo() {}

    public Todo(String user, String description, Date dueDate, boolean isDone) {
        this.user = user;
        this.description = description;
        this.dueDate = dueDate;
        this.isDone = isDone;
    }

    @Override
    public String toString() {
        return "Todo{" +
                "id='" + id + '\'' +
                ", user='" + user + '\'' +
                ", description='" + description + '\'' +
                ", dueDate=" + dueDate +
                ", isDone=" + isDone +
                '}';
    }
}
