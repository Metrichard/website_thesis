package com.elte.kolhok.resource;

public class DormRequest {

    private String id;
    private String dormName;
    private String dormAddress;
    private String dormCapacity;
    private String dormRoomDescription;
    private String dormBathroomDescription;
    private String dormCost;
    private String dormPrincipal;
    private String dormPrincipalEmailAddress;
    private String dormOriginalPage;
    private String fileName;

    public DormRequest() {
    }

    public DormRequest(String dormName, String dormAddress, String dormCapacity, String dormRoomDescription, String dormBathroomDescription, String dormCost, String dormPrincipal, String dormPrincipalEmailAddress, String dormOriginalPage, String fileName) {
        this.dormName = dormName;
        this.dormAddress = dormAddress;
        this.dormCapacity = dormCapacity;
        this.dormRoomDescription = dormRoomDescription;
        this.dormBathroomDescription = dormBathroomDescription;
        this.dormCost = dormCost;
        this.dormPrincipal = dormPrincipal;
        this.dormPrincipalEmailAddress = dormPrincipalEmailAddress;
        this.dormOriginalPage = dormOriginalPage;
        this.fileName = fileName;
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

    public String getDormCapacity() {
        return dormCapacity;
    }

    public void setDormCapacity(String dormCapacity) {
        this.dormCapacity = dormCapacity;
    }

    public String getDormRoomDescription() {
        return dormRoomDescription;
    }

    public void setDormRoomDescription(String dormRoomDescription) {
        this.dormRoomDescription = dormRoomDescription;
    }

    public String getDormBathroomDescription() {
        return dormBathroomDescription;
    }

    public void setDormBathroomDescription(String dormBathroomDescription) {
        this.dormBathroomDescription = dormBathroomDescription;
    }

    public String getDormCost() {
        return dormCost;
    }

    public void setDormCost(String dormCost) {
        this.dormCost = dormCost;
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

    public String getDormOriginalPage() {
        return dormOriginalPage;
    }

    public void setDormOriginalPage(String dormOriginalPage) {
        this.dormOriginalPage = dormOriginalPage;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
}
