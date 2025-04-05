package com.example.ZapinAdmin.Service;

import com.example.ZapinAdmin.Entity.EndUser;
import com.example.ZapinAdmin.Repository.EndUserRepository;
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
import java.util.List;

@Service
public class EndUserService {

    @Value("${image.upload.folder}")
    private String folderPath;

    @Autowired
    private EndUserRepository endUserRepository;

    public ResponseEntity<?> addEndUser(String role, String fullName, long mobileNumber, String email,
                                        String flatNumber, String buildingName, String laneNumber, String landmark, String pinCode,
                                        String adharNumber, MultipartFile adharImage, MultipartFile passportPhoto,
                                        String status) {
        try {
            // Ensure folderPath has a trailing slash
            if (!folderPath.endsWith("/") && !folderPath.endsWith("\\")) {
                folderPath += "/";
            }

            // Create the folder if it doesn't exist
            Files.createDirectories(Paths.get(folderPath));

            EndUser endUser = new EndUser();

            // Save Aadhar Image
            if (!adharImage.isEmpty()) {
                String adharFileName = "adhar_" + System.currentTimeMillis() + ".jpg";
                String adharTargetPath = folderPath + adharFileName;
                Files.copy(adharImage.getInputStream(), Paths.get(adharTargetPath), StandardCopyOption.REPLACE_EXISTING);
                endUser.setAdharImage(adharFileName);
            } else {
                endUser.setAdharImage(null);
            }

            // Save Passport Photo
            if (!passportPhoto.isEmpty()) {
                String passportFileName = "passport_" + System.currentTimeMillis() + ".jpg";
                String passportTargetPath = folderPath + passportFileName;
                Files.copy(passportPhoto.getInputStream(), Paths.get(passportTargetPath), StandardCopyOption.REPLACE_EXISTING);
                endUser.setPassportPhoto(passportFileName);
            } else {
                endUser.setPassportPhoto(null);
            }

            // Set other fields
            endUser.setRole(role);
            endUser.setFullName(fullName);
            endUser.setMobileNumber(mobileNumber);
            endUser.setEmail(email);
            endUser.setFlatNumber(flatNumber);
            endUser.setBuildingName(buildingName);
            endUser.setLaneNumber(laneNumber);
            endUser.setLandmark(landmark);
            endUser.setPinCode(pinCode);
            endUser.setAdharNumber(adharNumber);
            endUser.setStatus(status);

            // Save the user
            endUserRepository.save(endUser);

            return ResponseEntity.ok("User Added Successfully!");
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("File Upload Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("INTERNAL SERVER ERROR: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    //only show all customers list
    public List<EndUser> getAllCustometrs(){
      List<EndUser> customersList = endUserRepository.findByRole("Customer");
      if (!customersList.isEmpty()){
          return customersList;
      }
      return null;
    }

    //only show all deliveryBoy list
    public List<EndUser> getAllDeliveryBoy(){
        List<EndUser> endUserList=endUserRepository.findByRole("Delivery-boy");
        if(!endUserList.isEmpty()){
            return  endUserList;
        }
        return null;
    }


}
