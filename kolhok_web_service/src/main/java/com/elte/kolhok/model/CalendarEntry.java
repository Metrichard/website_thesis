package com.elte.kolhok.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document("calendar_entry")
public class CalendarEntry {

    @Id
    private String id;

    private Date startTime;
    private Date endTime;

    private String eventName;
    private String eventDescription;

    private List<String> images;

    public CalendarEntry() {
    }

    public CalendarEntry(String id, Date startTime, Date endTime, String eventName, String eventDescription) {
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.eventName = eventName;
        this.eventDescription = eventDescription;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getEventDescription() {
        return eventDescription;
    }

    public void setEventDescription(String eventDescription) {
        this.eventDescription = eventDescription;
    }
}
