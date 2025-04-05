package com.example.ZapinAdmin.Controller;

import com.example.ZapinAdmin.Entity.Div;
import com.example.ZapinAdmin.Entity.SubCategory;
import com.example.ZapinAdmin.Service.DivService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/div")
@CrossOrigin(origins = "http://localhost:5173")
public class DivController {

    @Autowired
    private DivService divService;

    @PostMapping("/adddiv")
    public ResponseEntity<?> addDiv(@RequestParam String divName)
    {
        return divService.addDiv(divName);
    }

    @GetMapping("/alldiv")
    public ResponseEntity<List<Div>> getAllDiv(){
        return divService.getAllDiv();}

}
