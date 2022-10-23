package com.elte.kolhok.resource;

public class DormRequest {

    private String id;
    private String dormName;
    private String dormAddress;
    private String dormPrincipal;
    private String dormPrincipalEmailAddress;

    public DormRequest() {
    }

    public DormRequest(String dormName, String dormAddress, String dormPrincipal, String dormPrincipalEmailAddress) {
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
