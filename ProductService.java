package com.example.ZapinAdmin.Service;

import com.example.ZapinAdmin.Entity.Category;
import com.example.ZapinAdmin.Entity.Outlet;
import com.example.ZapinAdmin.Entity.Product;
import com.example.ZapinAdmin.Entity.SubCategory;
import com.example.ZapinAdmin.Entity.OfferCupon;
import com.example.ZapinAdmin.Repository.CategoryRepository;
import com.example.ZapinAdmin.Repository.OutletRepository;
import com.example.ZapinAdmin.Repository.ProductRepository;
import com.example.ZapinAdmin.Repository.SubCategoryRepository;
import com.example.ZapinAdmin.Repository.OfferCuponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private SubCategoryRepository subCategoryRepository;

    @Autowired
    private OutletRepository outletRepository;

    @Autowired
    private OfferCuponRepository offerCuponRepository;

    public Product addProduct(int categoryId, int subCategory, String productType,
                                        String productName, String productCode, String strikePrice,
                                        String displayPrice, int outlet, String productSequence,
                                        String productDescription, int availableOfferId, String recommended, String link) {
            // Fetch Category
            Optional<Category> categoryOpt = categoryRepository.findByCategoryId(categoryId);

            // Fetch SubCategory
            SubCategory sub = subCategoryRepository.findBySubcategoryId(subCategory);

            // Fetch Outlet
             Outlet out=outletRepository.findByoutletId(outlet);

            // Fetch OfferCupon
            Optional<OfferCupon> offerCuponOpt = offerCuponRepository.findByOfferuponId(availableOfferId);

            // Create and Save Product
            Product product = new Product();
            product.setCategory(categoryOpt.get());
            product.setSubCategory(sub);
            product.setProductType(productType);
            product.setProductName(productName);
            product.setProductCode(productCode);

            product.setStrikePrice(String.valueOf(strikePrice));

            product.setDisplayPrice(String.valueOf(displayPrice));

            product.setOutlet(out);
            product.setProductSequence(productSequence);
            product.setProductDescription(productDescription);
            product.setAvailableOffer(offerCuponOpt.get());
            product.setRecommended(recommended);
            product.setLink(link);
            return  productRepository.save(product);
   }

        public ResponseEntity<List<Product>> getAllProducts(){
        List<Product> productList=productRepository.findAll();
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }

    public ResponseEntity<List<SubCategory>> getAllSubCategories(){
        List<SubCategory> categoryList=subCategoryRepository.findAll();
        return new ResponseEntity<>(categoryList,HttpStatus.OK);
    }

}
