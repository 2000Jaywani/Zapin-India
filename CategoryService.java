package com.example.ZapinAdmin.Service;

import com.example.ZapinAdmin.Entity.Category;
import com.example.ZapinAdmin.Repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class CategoryService {


    @Value("${image.upload.folder}")
    String folderPath;
    @Autowired
    private CategoryRepository categoryRepository;
    public ResponseEntity<?> addNewCategory(String cateName, MultipartFile image) throws IOException {
        try {
            Category cate = new Category();
            if (!image.isEmpty()) {
                long timeMills = System.currentTimeMillis();
                String targetPath = folderPath + timeMills + ".jpg";
                Files.copy(image.getInputStream(), Paths.get(targetPath), StandardCopyOption.REPLACE_EXISTING);
                cate.setCategoryImage(timeMills + ".jpg");
            } else {
                cate.setCategoryImage(null);
            }

            LocalDateTime now = LocalDateTime.now();
            cate.setCategoryName(cateName);
            cate.setActive(true);
            cate.setCreatedOn(now);
            cate.setUpdatedOn(now);
            Category save = categoryRepository.save(cate);
            return new ResponseEntity<>(save, HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<>("INTERNAL SERVER ERROR, ......", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

        public ResponseEntity<List<Category>> getAllCategories(){
            List<Category> categoryList=categoryRepository.findAll();
            return new ResponseEntity<>(categoryList,HttpStatus.OK);
        }


}
