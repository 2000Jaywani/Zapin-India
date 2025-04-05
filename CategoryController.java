package com.example.ZapinAdmin.Controller;

import com.example.ZapinAdmin.Entity.Category;
import com.example.ZapinAdmin.Service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/category")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {
        @Autowired
        private CategoryService categoryService;
        @PostMapping("/addcategory")
        public ResponseEntity<?> addNewCategory(@RequestParam String categoryName,@RequestParam MultipartFile categoryImage) throws  IOException{
            return categoryService.addNewCategory(categoryName,categoryImage);
        }

        @GetMapping("/allcategory")
        public ResponseEntity<List<Category>> getAllCategories(){
        return categoryService.getAllCategories();}

    }
