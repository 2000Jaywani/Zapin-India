package com.example.ZapinAdmin.Controller;

import com.example.ZapinAdmin.Entity.EndUser;
import com.example.ZapinAdmin.Entity.OfferCupon;
import com.example.ZapinAdmin.Service.EndUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/enduser")
@CrossOrigin(origins = "http://localhost:5173")

public class EndUserController {

    @Autowired
    private EndUserService endUserService;

    @PostMapping("/adduser")
    public ResponseEntity<?> addEndUser(@RequestParam String role ,@RequestParam String fullName ,
                                        @RequestParam long mobileNumber ,@RequestParam String email ,
                                        @RequestParam String flatNumber ,@RequestParam String buildingName ,
                                        @RequestParam String laneNumber ,@RequestParam String landmark,
                                        @RequestParam String pinCode , @RequestParam String adharNumber ,
                                        @RequestParam MultipartFile adharImage ,
                                        @RequestParam MultipartFile passportPhoto ,
                                        @RequestParam String status ) throws IOException {
        return endUserService.addEndUser(role, fullName, mobileNumber, email, flatNumber, buildingName,
                                         laneNumber,landmark, pinCode, adharNumber, adharImage, passportPhoto, status);

    }



    @GetMapping("/allCustomers")
    public ResponseEntity<List<EndUser>> getCustomer(){
        List<EndUser> customers=endUserService.getAllCustometrs();
        return ResponseEntity.status(200).body(customers);
    }


    @GetMapping("/allDeliveryBoy")
    public ResponseEntity<List<EndUser>> getDeliveryBoy(){
        List<EndUser> endUserList=endUserService.getAllDeliveryBoy();
        return  ResponseEntity.status(200).body(endUserList);
    }

}
