package com.example.ZapinAdmin.Controller;

import com.example.ZapinAdmin.Entity.User;
import com.example.ZapinAdmin.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/useradmin")
@CrossOrigin(origins = "http://localhost:5173")

public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> userLogin(@RequestBody User user) {
         return userService.userLogin(user);
    }



}
