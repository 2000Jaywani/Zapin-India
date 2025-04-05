package com.example.ZapinAdmin.Controller;

import com.example.ZapinAdmin.Entity.Category;
import com.example.ZapinAdmin.Entity.Outlet;
import com.example.ZapinAdmin.Service.OutletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/outlet")
@CrossOrigin (origins = "http://localhost:5173")
public class OutletController {
    @Autowired
    private OutletService outletService;

    @RequestMapping("/addOutlet")
    public ResponseEntity<?> AddOutlet(@RequestParam String location ,
                                       @RequestParam long pinCode){
       return outletService.AddOutlet(location,pinCode);
    }


    @GetMapping("/allOutlet")
    public ResponseEntity<List<Outlet>> getAllOutlet()
    {
        return outletService.getAllOutlet();
    }
}
