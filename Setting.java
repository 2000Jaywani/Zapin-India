package com.example.ZapinAdmin.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "setting_master")
public class Setting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int settingId;
    private String firstName;
    private long mobileNumber;
    private String email;
    private  String address;

    public Setting() {
    }

    public Setting(int settingId, String firstName, long mobileNumber, String email, String address) {
        this.settingId = settingId;
        this.firstName = firstName;
        this.mobileNumber = mobileNumber;
        this.email = email;
        this.address = address;
    }

    public int getSettingId() {
        return settingId;
    }

    public void setSettingId(int settingId) {
        this.settingId = settingId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public long getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(long mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
