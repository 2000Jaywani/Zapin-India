package com.example.ZapinAdmin.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "outlet_master")
public class Outlet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int outletId;
    @Column(nullable = false , unique = false)
    private String location;
    @Column(nullable = false , unique = true)
    private long pinCode;

    public Outlet() {
    }

    public Outlet(int outletId, String location, long pinCode) {
        this.outletId = outletId;
        this.location = location;
        this.pinCode = pinCode;
    }

    public int getOutletId() {
        return outletId;
    }

    public void setOutletId(int outletId) {
        this.outletId = outletId;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public long getPinCode() {
        return pinCode;
    }

    public void setPinCode(long pinCode) {
        this.pinCode = pinCode;
    }
}
