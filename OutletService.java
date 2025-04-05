package com.example.ZapinAdmin.Service;

import com.example.ZapinAdmin.Entity.Category;
import com.example.ZapinAdmin.Entity.Outlet;
import com.example.ZapinAdmin.Repository.OutletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OutletService {

    @Autowired
    private OutletRepository outletRepository;

    public ResponseEntity<?> AddOutlet(String location, long pinCode)
    {
        Outlet outlet=new Outlet();
        outlet.setLocation(location);
        outlet.setPinCode(pinCode);
        outletRepository.save(outlet);
        return ResponseEntity.ok("OUTLET ADDED SUCCESSFULLY");
    }

    public ResponseEntity<List<Outlet>> getAllOutlet()
    {
        List<Outlet> outletList=outletRepository.findAll();
        return new ResponseEntity<>(outletList, HttpStatus.OK);
    }



}
