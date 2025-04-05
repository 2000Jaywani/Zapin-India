package com.example.ZapinAdmin.Controller;

import com.example.ZapinAdmin.Entity.Product;
import com.example.ZapinAdmin.Entity.SubCategory;
import com.example.ZapinAdmin.Service.ProductService;
import com.example.ZapinAdmin.Service.SubCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private SubCategoryService subCategoryService;

    @PostMapping("/addproduct")
    public ResponseEntity<?> addProduct(@RequestParam int category,
                                        @RequestParam int subCategory ,
                                        @RequestParam String productType,
                                        @RequestParam String productName ,
                                        @RequestParam String productCode ,
                                        @RequestParam String strikePrice ,
                                        @RequestParam String displayPrice ,
                                        @RequestParam int outlet,
                                        @RequestParam String productSequence ,
                                        @RequestParam String productDescription ,
                                        @RequestParam int availableOffer ,
                                        @RequestParam String recommended ,
                                        @RequestParam String link){
        Product save=productService.addProduct(category,subCategory, productType, productName,
                productCode,strikePrice,displayPrice,outlet,productSequence,productDescription, availableOffer,recommended,link);
        return  ResponseEntity.ok().body(save);
    }


    @GetMapping("/allProductsView")
    public ResponseEntity<List<Product>> getAllProducts(){
        return productService.getAllProducts();}

    @GetMapping("/allSubcategory")
    public ResponseEntity<List<SubCategory>> getAllSubCategories(){
        return subCategoryService.getAllSubCategories();}
}
