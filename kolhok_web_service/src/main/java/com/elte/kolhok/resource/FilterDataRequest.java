package com.elte.kolhok.resource;

public class FilterDataRequest {

    private String id;
    private String pageName;
    private String tag;

    public FilterDataRequest() {
    }

    public FilterDataRequest(String pageName, String tag) {
        this.pageName = pageName;
        this.tag = tag;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPageName() {
        return pageName;
    }

    public void setPageName(String pageName) {
        this.pageName = pageName;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }
}
