package com.example.ZapinAdmin.Controller;

import com.example.ZapinAdmin.Service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "*")
public class ImageController {
    @Autowired
    private ImageService imageService;

    @GetMapping("/image/{imageName}")
    public ResponseEntity<?> serveImage(@PathVariable String imageName) throws IOException {
        return imageService.serveImage(imageName);
    }


}
