package com.elte.kolhok.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("dorms")
public class Dorm {

    @Id
    private String id;
    private String dormName;
    private String dormAddress;
    private String dormPrincipal;
    private String dormPrincipalEmailAddress;

    public Dorm() {
    }

    public Dorm(String id, String dormName, String dormAddress, String dormPrincipal, String dormPrincipalEmailAddress) {
        this.id = id;
        this.dormName = dormName;
        this.dormAddress = dormAddress;
        this.dormPrincipal = dormPrincipal;
        this.dormPrincipalEmailAddress = dormPrincipalEmailAddress;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDormName() {
        return dormName;
    }

    public void setDormName(String dormName) {
        this.dormName = dormName;
    }

    public String getDormAddress() {
        return dormAddress;
    }

    public void setDormAddress(String dormAddress) {
        this.dormAddress = dormAddress;
    }

    public String getDormPrincipal() {
        return dormPrincipal;
    }

    public void setDormPrincipal(String dormPrincipal) {
        this.dormPrincipal = dormPrincipal;
    }

    public String getDormPrincipalEmailAddress() {
        return dormPrincipalEmailAddress;
    }

    public void setDormPrincipalEmailAddress(String dormPrincipalEmailAddress) {
        this.dormPrincipalEmailAddress = dormPrincipalEmailAddress;
    }
}
