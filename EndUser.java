package com.example.ZapinAdmin.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "enduser_master")
public class EndUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int enduserId;

    @Column(nullable = false)
    private String role;
    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private long mobileNumber;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String flatNumber;

    @Column(nullable = false)
    private String buildingName;

    @Column(nullable = false)
    private String laneNumber;

    @Column(nullable = false)
    private String landmark;

    @Column(nullable = false)
    private String pinCode;

    @Column(nullable = false)
    private String adharNumber;

    @Column(nullable = false )
    private String adharImage;

    @Column(nullable = false)
    private String passportPhoto;

    @Column(nullable = false)
    private String status;

    public EndUser() {
    }

    public EndUser(int enduserId, String role, String fullName, long mobileNumber, String email, String flatNumber, String buildingName, String laneNumber, String landmark, String pinCode, String adharNumber, String adharImage, String passportPhoto, String status) {
        this.enduserId = enduserId;
        this.role = role;
        this.fullName = fullName;
        this.mobileNumber = mobileNumber;
        this.email = email;
        this.flatNumber = flatNumber;
        this.buildingName = buildingName;
        this.laneNumber = laneNumber;
        this.landmark = landmark;
        this.pinCode = pinCode;
        this.adharNumber = adharNumber;
        this.adharImage = adharImage;
        this.passportPhoto = passportPhoto;
        this.status = status;
    }


    public int getEnduserId() {
        return enduserId;
    }

    public void setEnduserId(int enduserId) {
        this.enduserId = enduserId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
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

    public String getFlatNumber() {
        return flatNumber;
    }

    public void setFlatNumber(String flatNumber) {
        this.flatNumber = flatNumber;
    }

    public String getBuildingName() {
        return buildingName;
    }

    public void setBuildingName(String buildingName) {
        this.buildingName = buildingName;
    }

    public String getLaneNumber() {
        return laneNumber;
    }

    public void setLaneNumber(String laneNumber) {
        this.laneNumber = laneNumber;
    }

    public String getLandmark() {
        return landmark;
    }

    public void setLandmark(String landmark) {
        this.landmark = landmark;
    }

    public String getPinCode() {
        return pinCode;
    }

    public void setPinCode(String pinCode) {
        this.pinCode = pinCode;
    }

    public String getAdharNumber() {
        return adharNumber;
    }

    public void setAdharNumber(String adharNumber) {
        this.adharNumber = adharNumber;
    }

    public String getAdharImage() {
        return adharImage;
    }

    public void setAdharImage(String adharImage) {
        this.adharImage = adharImage;
    }

    public String getPassportPhoto() {
        return passportPhoto;
    }

    public void setPassportPhoto(String passportPhoto) {
        this.passportPhoto = passportPhoto;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
