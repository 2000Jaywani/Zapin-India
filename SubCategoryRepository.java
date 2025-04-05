package com.example.ZapinAdmin.Repository;

import com.example.ZapinAdmin.Entity.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubCategoryRepository extends JpaRepository<SubCategory , Integer> {

//    SubCategory findByName(String subcategoryName);

    SubCategory findBySubcategoryId(int subcategoryName);
}
