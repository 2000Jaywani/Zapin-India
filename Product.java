package com.example.ZapinAdmin.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "product_master")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productId;

    @ManyToOne()
    @JoinColumn(name = "categoryId")
    private Category category;

    @ManyToOne()
    @JoinColumn(name = "subcategoryId")
    private SubCategory subCategory;

    @Column(nullable = false)
    private String productType;

    @Column(nullable = false)
    private String productName;

    @Column(nullable = false)
    private String productCode;

    @Column(nullable = false)
    private String strikePrice;

    @Column(nullable = false)
    private String displayPrice;

    @ManyToOne
    @JoinColumn(name = "OutletId")
    private Outlet outlet;

    @Column(nullable = false)
    private String productSequence;

    @Column(nullable = false)
    private String productDescription;

    @ManyToOne
    @JoinColumn(name = "offeruponId")
    private OfferCupon availableOffer;

    @Column(nullable = false)
    private String recommended;

    @Column(nullable = false)
    private String link;

    public Product() {
    }

    public Product(int productId, Category category, SubCategory subCategory, String productType, String productName, String productCode, String strikePrice, String displayPrice, Outlet outlet, String productSequence, String productDescription, OfferCupon availableOffer, String recommended, String link) {
        this.productId = productId;
        this.category = category;
        this.subCategory = subCategory;
        this.productType = productType;
        this.productName = productName;
        this.productCode = productCode;
        this.strikePrice = strikePrice;
        this.displayPrice = displayPrice;
        this.outlet = outlet;
        this.productSequence = productSequence;
        this.productDescription = productDescription;
        this.availableOffer = availableOffer;
        this.recommended = recommended;
        this.link = link;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public SubCategory getSubCategory() {
        return subCategory;
    }

    public void setSubCategory(SubCategory subCategory) {
        this.subCategory = subCategory;
    }

    public String getProductType() {
        return productType;
    }

    public void setProductType(String productType) {
        this.productType = productType;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getStrikePrice() {
        return strikePrice;
    }

    public void setStrikePrice(String strikePrice) {
        this.strikePrice = strikePrice;
    }

    public String getDisplayPrice() {
        return displayPrice;
    }

    public void setDisplayPrice(String displayPrice) {
        this.displayPrice = displayPrice;
    }

    public Outlet getOutlet() {
        return outlet;
    }

    public void setOutlet(Outlet outlet) {
        this.outlet = outlet;
    }

    public String getProductSequence() {
        return productSequence;
    }

    public void setProductSequence(String productSequence) {
        this.productSequence = productSequence;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public OfferCupon getAvailableOffer() {
        return availableOffer;
    }

    public void setAvailableOffer(OfferCupon availableOffer) {
        this.availableOffer = availableOffer;
    }

    public String getRecommended() {
        return recommended;
    }

    public void setRecommended(String recommended) {
        this.recommended = recommended;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
}
