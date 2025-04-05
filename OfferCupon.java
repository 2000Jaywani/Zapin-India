package com.example.ZapinAdmin.Entity;

import jakarta.persistence.*;
import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.NotFound;

import java.awt.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "offercupon_master")
public class OfferCupon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int offeruponId;
    private String cuponCode;
    private long percentage;
    private String description;
    private LocalDateTime createDate;

    @Column(nullable = false)
    @NotNull
    private Boolean status;
    private String OfferImage;

    public OfferCupon() {
    }

    public OfferCupon(int offeruponId, String cuponCode, long percentage, String description, LocalDateTime createDate, Boolean status, String offerImage) {
        this.offeruponId = offeruponId;
        this.cuponCode = cuponCode;
        this.percentage = percentage;
        this.description = description;
        this.createDate = createDate;
        this.status = status;
        OfferImage = offerImage;
    }

    public int getOfferuponId() {
        return offeruponId;
    }

    public void setOfferuponId(int offeruponId) {
        this.offeruponId = offeruponId;
    }

    public String getCuponCode() {
        return cuponCode;
    }

    public void setCuponCode(String cuponCode) {
        this.cuponCode = cuponCode;
    }

    public long getPercentage() {
        return percentage;
    }

    public void setPercentage(long percentage) {
        this.percentage = percentage;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getCreateDate() {
        return createDate;
    }

    public void setCreateDate(LocalDateTime createDate) {
        this.createDate = createDate;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getOfferImage() {
        return OfferImage;
    }

    public void setOfferImage(String offerImage) {
        OfferImage = offerImage;
    }
}
