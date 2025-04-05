package com.example.ZapinAdmin.Service;

import com.example.ZapinAdmin.Entity.Setting;
import com.example.ZapinAdmin.Entity.SubCategory;
import com.example.ZapinAdmin.Repository.SettingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SettingService {

    @Autowired
    private SettingRepository settingRepository;

    public Setting addSettingData(String firstName , long mobileNumber , String email , String address )
    {
           Optional <Setting> existingSetting=settingRepository.findByemail(email);

        try {
            Setting setting;
            if (existingSetting.isPresent()) {

                setting=existingSetting.get();
                setting.setFirstName(firstName);
                setting.setMobileNumber(mobileNumber);
                setting.setAddress(address);

            } else {

                setting = new Setting();
                setting.setFirstName(firstName);
                setting.setMobileNumber(mobileNumber);
                setting.setEmail(email);
                setting.setAddress(address);
            }

            return settingRepository.save(setting);
        }
        catch (Exception e)
        {
          throw new RuntimeException("Error while saving setting data", e);
        }
   }


    public ResponseEntity<List<Setting>> getAllSettingData(){
        List<Setting> settings=settingRepository.findAll();
        return new ResponseEntity<>(settings,HttpStatus.OK);
    }


}
