package com.example.ZapinAdmin.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "div_master")
public class Div {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int divId;
    private String divName;

    public Div() {
    }

    public Div(int divId, String divName) {
        this.divId = divId;
        this.divName = divName;
    }

    public int getDivId() {
        return divId;
    }

    public void setDivId(int divId) {
        this.divId = divId;
    }

    public String getDivName() {
        return divName;
    }

    public void setDivName(String divName) {
        this.divName = divName;
    }
}
