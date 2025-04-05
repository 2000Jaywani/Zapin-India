package com.example.ZapinAdmin.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
@Service
public class ImageService {
    @Value("${image.upload.folder}")
    private String folderPath;


    public ResponseEntity<?> serveImage(String imageName) throws MalformedURLException, IOException {

        Path imagePath = Paths.get(folderPath, imageName);


        Resource imageResource = new UrlResource(imagePath.toUri());

        // Check if the image exists
        if (!imageResource.exists()) {
            return ResponseEntity.notFound().build();
        }

        // Determine the content type dynamically based on the file extension
        String contentType = Files.probeContentType(imagePath);
        if (contentType == null) {
            contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE; // Default to binary stream if content type is unknown
        }

        // Return the image with the appropriate content type
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + imageResource.getFilename() + "\"")
                .body(imageResource);
    }

}
