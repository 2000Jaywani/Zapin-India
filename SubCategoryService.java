package com.example.ZapinAdmin.Service;

import com.example.ZapinAdmin.Entity.Category;
import com.example.ZapinAdmin.Entity.SubCategory;
import com.example.ZapinAdmin.Repository.CategoryRepository;
import com.example.ZapinAdmin.Repository.SubCategoryRepository;
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
import java.util.Optional;

@Service
public class SubCategoryService {


    @Value("${image.upload.folder}")
    private String folderPath;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private SubCategoryRepository subCategoryRepository;

    public ResponseEntity<?> addNewSubCategory(int category, String subcategoryName , MultipartFile subcategoryImage) throws IOException {
        try {

            Optional<Category> cat=categoryRepository.findById(category);
            SubCategory subCategory=new SubCategory();

            if(!subcategoryImage.isEmpty())
            {
                long timeMills=System.currentTimeMillis();
                String targetPath=folderPath+timeMills+".jpg";
                Files.copy(subcategoryImage.getInputStream(), Paths.get(targetPath), StandardCopyOption.REPLACE_EXISTING);
                subCategory.setSubcategoryImage(timeMills+ ".jpg");
            }
            else
            {
                subCategory.setSubcategoryImage(null);
            }

            LocalDateTime now=LocalDateTime.now();
            subCategory.setSubcategoryName(subcategoryName);
            subCategory.setCategory(cat.get());
            subCategory.setCreatedOn(now);
            subCategory.setUpdatedOn(now);
            SubCategory save=subCategoryRepository.save(subCategory);
            return new ResponseEntity<>(save, HttpStatus.CREATED);

        }
        catch (Exception e){
            return new ResponseEntity<>("Internal Server Error"+e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public ResponseEntity<List<SubCategory>> getAllSubCategories(){
        List<SubCategory> categoryList=subCategoryRepository.findAll();
        return new ResponseEntity<>(categoryList,HttpStatus.OK);
    }


}
