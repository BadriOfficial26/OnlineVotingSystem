package com.movie.Moviebackend.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;



@Service
public class conditaService {
	 private final String uploadDir = "C:/uploads";	
	
	
	
	 public String saveFile(MultipartFile file) throws IOException {
	        File dir = new File(uploadDir);
	        if (!dir.exists()) dir.mkdirs();  // Ensure directory exists

	        String filePath = uploadDir + file.getOriginalFilename();
	        Files.copy(file.getInputStream(), Path.of(filePath), StandardCopyOption.REPLACE_EXISTING);
	        return filePath;
	    }

	    public byte[] getImage(String fileName) throws IOException {
	        Path path = Path.of(uploadDir + fileName);
	        return Files.readAllBytes((java.nio.file.Path) path);
	    }

}
