package com.example.ZapinAdmin.Controller;

import com.example.ZapinAdmin.Entity.Category;
import com.example.ZapinAdmin.Entity.SubCategory;
import com.example.ZapinAdmin.Service.SubCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/subcategory")
@CrossOrigin(origins = "http://localhost:5173")

public class SubCategoryController {

        @Autowired
        private SubCategoryService subCategoryService;

        @PostMapping("/addsubcategory")
        public ResponseEntity<?> addNewSubCategory(@RequestParam int category,
                                                   @RequestParam String subcategoryName,
                                                   @RequestParam MultipartFile subcategoryImage) throws IOException {
                return subCategoryService.addNewSubCategory(category,subcategoryName,subcategoryImage);
        }

        @GetMapping("/allSubcategory")
        public ResponseEntity<List<SubCategory>> getAllSubCategories(){
                return subCategoryService.getAllSubCategories();}
}
