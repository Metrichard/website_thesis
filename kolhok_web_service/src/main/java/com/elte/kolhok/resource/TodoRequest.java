package com.elte.kolhok.resource;

import java.util.Date;

public class TodoRequest {

    private String user;
    private String description;
    private Date dueDate;
    private boolean isDone;

    public TodoRequest() {
    }

    public TodoRequest(String user, String description, Date dueDate, boolean isDone) {
        this.user = user;
        this.description = description;
        this.dueDate = dueDate;
        this.isDone = isDone;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public boolean isDone() {
        return isDone;
    }

    public void setDone(boolean done) {
        isDone = done;
    }
}
