package com.example.ZapinAdmin.Service;

import com.example.ZapinAdmin.Entity.OfferCupon;
import com.example.ZapinAdmin.Repository.OfferCuponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OfferCuponService {
        @Autowired
        private OfferCuponRepository offerCuponRepository;


        @Value("${image.upload.folder}")
        private String folderPath;

        public ResponseEntity<?> addOfferCupon(String cuponCode, long percentage ,
                                               String description, LocalDateTime createDate ,
                                               String status, MultipartFile OfferImage)
        {
        try
          {
              OfferCupon offerCupon=new OfferCupon();
                  if(!OfferImage.isEmpty()){
                  long timeMills=System.currentTimeMillis();
                  String targetPath=folderPath+timeMills+ ".jpg";
                  Files.copy(OfferImage.getInputStream(), Paths.get(targetPath), StandardCopyOption.REPLACE_EXISTING);
                  offerCupon.setOfferImage(timeMills+ ".jpg");

              }
              else
              {
                  offerCupon.setOfferImage(null);
              }

              //LocalDateTime now=LocalDateTime.now();
              offerCupon.setCuponCode(cuponCode);
              offerCupon.setPercentage(percentage);
              offerCupon.setDescription(description);
              offerCupon.setCreateDate(createDate);

              boolean result=(status.trim().equalsIgnoreCase("Active")?true:false);
              offerCupon.setStatus(result);

              OfferCupon save=offerCuponRepository.save(offerCupon);
              return new ResponseEntity<>("Offer Coupon added Successfully", HttpStatus.CREATED);
          }
          catch (Exception e)
          {
             return new ResponseEntity<>("INTERNAL SEVER ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
          }
        }

           public ResponseEntity<List<OfferCupon>> getAllOfferCupon()
           {
             List<OfferCupon> offerCuponList=offerCuponRepository.findAll();
              return new ResponseEntity<>(offerCuponList,HttpStatus.OK);
           }




}
