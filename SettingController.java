package com.example.ZapinAdmin.Controller;

import com.example.ZapinAdmin.Entity.Setting;
import com.example.ZapinAdmin.Entity.SubCategory;
import com.example.ZapinAdmin.Service.SettingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/setting")
@CrossOrigin(origins = "http://localhost:5173")
public class SettingController {

    @Autowired
    private SettingService settingService;

    @PostMapping("/saveUpdate")
    public ResponseEntity<?> addSettingData(
                                  @RequestParam String firstName ,
                                  @RequestParam long mobileNumber ,
                                  @RequestParam String email ,
                                  @RequestParam String address )
    {
      Setting save=settingService.addSettingData(firstName,mobileNumber,email,address);
      return ResponseEntity.ok().body(save);
    }


    @GetMapping("/allSettingData")
    public ResponseEntity<List<Setting>> getAllSettingData(){
        return settingService.getAllSettingData();}


}
