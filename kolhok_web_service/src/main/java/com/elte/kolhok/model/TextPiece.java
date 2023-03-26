package com.elte.kolhok.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Document("text-pieces")
public class TextPiece {

    private String id;
    private String targetLanguage;
    private Map<String, String> fieldAndText;

    public TextPiece() {
    }

    public TextPiece(String targetLanguage, Map<String, String> fieldAndText) {
        this.targetLanguage = targetLanguage;
        this.fieldAndText = fieldAndText;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTargetLanguage() {
        return targetLanguage;
    }

    public void setTargetLanguage(String targetLanguage) {
        this.targetLanguage = targetLanguage;
    }

    public Map<String, String> getFieldAndText() {
        return fieldAndText;
    }

    public void setFieldAndText(Map<String, String> fieldAndText) {
        this.fieldAndText = fieldAndText;
    }
}
