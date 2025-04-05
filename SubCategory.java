package com.example.ZapinAdmin.Entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "subcategory_master", uniqueConstraints = {@UniqueConstraint(columnNames = "subcategory_name")})
public class SubCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int subcategoryId;
    @Column(name = "subcategory_name",unique = true,nullable = false)
    private String subcategoryName;
    private String subcategoryImage;
    @ManyToOne()
    @JoinColumn(name = "categoryId" ,referencedColumnName ="categoryId" )
    private Category category;
    private LocalDateTime createdOn;
    private LocalDateTime updatedOn;

    public SubCategory() {
    }

    public SubCategory(int subcategoryId, String subcategoryName, String subcategoryImage, Category category, LocalDateTime createdOn, LocalDateTime updatedOn) {
        this.subcategoryId = subcategoryId;
        this.subcategoryName = subcategoryName;
        this.subcategoryImage = subcategoryImage;
        this.category = category;
        this.createdOn = createdOn;
        this.updatedOn = updatedOn;
    }

    public int getSubcategoryId() {
        return subcategoryId;
    }

    public void setSubcategoryId(int subcategoryId) {
        this.subcategoryId = subcategoryId;
    }

    public String getSubcategoryName() {
        return subcategoryName;
    }

    public void setSubcategoryName(String subcategoryName) {
        this.subcategoryName = subcategoryName;
    }

    public String getSubcategoryImage() {
        return subcategoryImage;
    }

    public void setSubcategoryImage(String subcategoryImage) {
        this.subcategoryImage = subcategoryImage;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public LocalDateTime getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(LocalDateTime createdOn) {
        this.createdOn = createdOn;
    }

    public LocalDateTime getUpdatedOn() {
        return updatedOn;
    }

    public void setUpdatedOn(LocalDateTime updatedOn) {
        this.updatedOn = updatedOn;
    }
}
