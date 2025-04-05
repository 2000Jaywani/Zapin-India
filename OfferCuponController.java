package com.example.ZapinAdmin.Controller;

import com.example.ZapinAdmin.Entity.OfferCupon;
import com.example.ZapinAdmin.Service.OfferCuponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/offerCupon")

@CrossOrigin(origins = "http://localhost:5173")
public class OfferCuponController {

    @Autowired
    private OfferCuponService offerCuponService;

    @RequestMapping("/addoffercupon")
    public ResponseEntity<?> addOfferCupon(@RequestParam String cuponCode,
                                           @RequestParam long percentage ,
                                           @RequestParam String description,
                                           @RequestParam LocalDateTime createDate ,
                                           @RequestParam String status,
                                           @RequestParam MultipartFile OfferImage){
        return offerCuponService.addOfferCupon(cuponCode,percentage,description,createDate,status,OfferImage);
    }


    @GetMapping("/allOffercupon")
    public ResponseEntity<List<OfferCupon>> getAllOfferCupon(){
        return offerCuponService.getAllOfferCupon();
    }


}
