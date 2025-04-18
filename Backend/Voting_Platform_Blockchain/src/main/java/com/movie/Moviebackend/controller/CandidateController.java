package com.movie.Moviebackend.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.movie.Moviebackend.model.Candidate;
import com.movie.Moviebackend.repository.CandidateRepository;
import com.movie.Moviebackend.service.conditaService;
@RestController
@RequestMapping("/candidates")
public class CandidateController {
	@Autowired
	private conditaService ser;

    @Autowired
    private CandidateRepository candidateRepository;

    @Value("${upload.path}") // Specify the directory path where images will be stored
    private String uploadPath;

    // GET all candidates
    @GetMapping
    public ResponseEntity<List<Candidate>> getAllCandidates() {
        List<Candidate> candidates = candidateRepository.findAll();
        return new ResponseEntity<>(candidates, HttpStatus.OK);
    }

    // GET candidate by Aadhar card number
    @GetMapping("/{aadharcardNumber}")
    public ResponseEntity<Candidate> getCandidateByAadharcardNumber(@PathVariable String aadharcardNumber) {
        Candidate candidate = candidateRepository.findByAadharcardNumber(aadharcardNumber);
        if (candidate != null) {
            return new ResponseEntity<>(candidate, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
//    // lakshmanan
//    
//    @GetMapping("laks/{aadharcardNumber}")
//    public ResponseEntity<Map<String, Object>> getCandidateWithImage(@PathVariable String aadharcardNumber) {
//        // Fetch the candidate
//        Candidate candidate = candidateRepository.findByAadharcardNumber(aadharcardNumber);
//        if (candidate == null) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//
//        // Load the image file
//        try {
//            Path filePath = Paths.get("image").resolve(candidate.getImagePath()).normalize();
//            Resource resource = new UrlResource(filePath.toUri());
//
//            if (!resource.exists() || !resource.isReadable()) {
//                System.out.println("File not found or not readable: " + candidate.getImagePath());
//                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//            }
//
//            // Read the image file and encode it as Base64
//            byte[] imageBytes = Files.readAllBytes(filePath);
//            String base64Image = Base64.getEncoder().encodeToString(imageBytes);
//
//            // Create the response
//            Map<String, Object> response = new HashMap<>();
//            response.put("candidate", candidate);
//            response.put("image", base64Image);
//
//            return new ResponseEntity<>(response, HttpStatus.OK);
//        } catch (IOException e) {
//            System.out.println("Error accessing file: " + e.getMessage());
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
    
    
    // lakshmanan    
    @GetMapping("laks/{aadharcardNumber}")
    public ResponseEntity<Map<String, Object>> getCandidateWithImage(@PathVariable String aadharcardNumber) {
        // Fetch the candidate
        Candidate candidate = candidateRepository.findByAadharcardNumber(aadharcardNumber);
        if (candidate == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // Load the image file
        try {
            Path filePath = Paths.get("image").resolve(candidate.getImagePath()).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists() || !resource.isReadable()) {
                System.out.println("File not found or not readable: " + candidate.getImagePath());
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            // Read the image file and encode it as Base64
            byte[] imageBytes = Files.readAllBytes(filePath);
            String base64Image = Base64.getEncoder().encodeToString(imageBytes);

            // Create the response
            Map<String, Object> response = new HashMap<>();
            response.put("candidate", candidate);
            response.put("image", base64Image);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IOException e) {
            System.out.println("Error accessing file: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
    //lakshmanand
    
   
    
    // POST create a new candidate without image and full name
    @PostMapping("laks/basic")
    public ResponseEntity<String> createCandidateBasic1(@RequestParam("aadharcardNumber") String aadharcardNumber,
                                                       @RequestParam("emailid") String emailid,
                                                       @RequestParam("password") String password,
                                                       @RequestParam("address") String address,
                                                       @RequestParam("city") String city,
                                                       @RequestParam("state") String state,
                                                       @RequestParam("phoneNumber") String phoneNumber,
                                                       @RequestParam("candidateName") String candidateName,
                                                       @RequestParam("file") MultipartFile file ,
                                                       @RequestParam("emblemName") String emblemName) {

        // Check if the aadharcardNumber already exists
        if (candidateRepository.existsById(aadharcardNumber)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("A candidate with this Aadhar card number already exists!");
        }

        try {
            // Create a new candidate without image and full name
            Candidate candidate = new Candidate();
            candidate.setAadharcardNumber(aadharcardNumber);
            candidate.setEmailid(emailid);
            candidate.setPassword(password);
            candidate.setAddress(address);
            candidate.setCity(city);
            candidate.setState(state);
            candidate.setPhoneNumber(phoneNumber);
            candidate.setCandidateName(candidateName);
            candidate.setEmblemName(emblemName);
        	
        	 
               try {   // Ensure the upload directory exists
                  Path uploadPath = Paths.get(uploadDir);
                  if (!Files.exists(uploadPath)) {
                      Files.createDirectories(uploadPath);
                  }

                  // Generate a unique filename
                  String fileName = file.getOriginalFilename();
                  Path filePath = uploadPath.resolve(fileName);

                  // Save the file to the "image" folder
                  Files.copy(file.getInputStream(), filePath);

                 // return ResponseEntity.ok("File uploaded successfully: " + fileName);
                  
                  
                  candidate.setImagePath(fileName);
                  
                  candidateRepository.save(candidate); //finel seve

                  return ResponseEntity.status(HttpStatus.CREATED).body("Candidate created successfully without image and full name!");

              } catch (IOException e) {
                  return ResponseEntity.internalServerError().body("Failed to upload file: " + e.getMessage());
              }
        	  
        
     

           
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create candidate: " + e.getMessage());
        }
    }
    
    


    // POST create a new candidate with image upload
    @PostMapping
    public ResponseEntity<String> createCandidate(@RequestParam("file") MultipartFile file,
                                                  @RequestParam("aadharcardNumber") String aadharcardNumber,
                                                  @RequestParam("fullname") String fullname,
                                                  @RequestParam("emailid") String emailid,
                                                  @RequestParam("password") String password,
                                                  @RequestParam("address") String address,
                                                  @RequestParam("city") String city,
                                                  @RequestParam("state") String state,
                                                  @RequestParam("phoneNumber") String phoneNumber,
                                                  @RequestParam("candidateName") String candidateName) {

        // Check if the aadharcardNumber already exists
        if (candidateRepository.existsById(aadharcardNumber)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("A candidate with this Aadhar card number already exists!");
        }

        try {
            // Check if the file is empty
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Please upload a file!");
            }

            // Normalize file name
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path imagePath = Paths.get(uploadPath + fileName);

            // Save the file to the specified location
            Files.copy(file.getInputStream(), imagePath);

            // Save candidate details to database
            Candidate candidate = new Candidate(aadharcardNumber, fullname, emailid, password, address, city, state, phoneNumber, fileName, candidateName, fileName, fileName); // Provide fileName for imagePath
            candidateRepository.save(candidate);

            return ResponseEntity.status(HttpStatus.CREATED).body("Candidate created successfully!");

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file: " + e.getMessage());
        }
    }

    
    // POST create a new candidate without image and full name
    @PostMapping("/basic")
    public ResponseEntity<String> createCandidateBasic(@RequestParam("aadharcardNumber") String aadharcardNumber,
                                                       @RequestParam("emailid") String emailid,
                                                       @RequestParam("password") String password,
                                                       @RequestParam("address") String address,
                                                       @RequestParam("city") String city,
                                                       @RequestParam("state") String state,
                                                       @RequestParam("phoneNumber") String phoneNumber,
                                                       @RequestParam("candidateName") String candidateName,
                                                       @RequestParam("file") MultipartFile file
                                                       
    		
    		) {

        // Check if the aadharcardNumber already exists
        if (candidateRepository.existsById(aadharcardNumber)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("A candidate with this Aadhar card number already exists!");
        }

        try {
            // Create a new candidate without image and full name
            Candidate candidate = new Candidate();
            candidate.setAadharcardNumber(aadharcardNumber);
            candidate.setEmailid(emailid);
            candidate.setPassword(password);
            candidate.setAddress(address);
            candidate.setCity(city);
            candidate.setState(state);
            candidate.setPhoneNumber(phoneNumber);
            candidate.setCandidateName(candidateName);
        	
        	 
               try {   // Ensure the upload directory exists
                  Path uploadPath = Paths.get(uploadDir);
                  if (!Files.exists(uploadPath)) {
                      Files.createDirectories(uploadPath);
                  }

                  // Generate a unique filename
                  String fileName = file.getOriginalFilename();
                  Path filePath = uploadPath.resolve(fileName);

                  // Save the file to the "image" folder
                  Files.copy(file.getInputStream(), filePath);

                 // return ResponseEntity.ok("File uploaded successfully: " + fileName);
                  
                  
                  candidate.setImagePath(fileName);
                  
                  candidateRepository.save(candidate); //finel seve

                  return ResponseEntity.status(HttpStatus.CREATED).body("Candidate created successfully without image and full name!");

              } catch (IOException e) {
                  return ResponseEntity.internalServerError().body("Failed to upload file: " + e.getMessage());
              }
        	  
        
     

           
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create candidate: " + e.getMessage());
        }
    }
    
    
    // PUT update candidate's full name and image by Aadhar card number
    @PutMapping("/{aadharcardNumber}/update-fullname-image")
    public ResponseEntity<Candidate> updateCandidateFullNameAndImage(
            @PathVariable String aadharcardNumber,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "fullname", required = false) String fullname) {

        try {
            Optional<Candidate> candidateData = candidateRepository.findById(aadharcardNumber);

            if (candidateData.isPresent()) {
                Candidate candidate = candidateData.get();

                // Update fullname if provided
                if (fullname != null) {
                    candidate.setFullname(fullname);
                }

                // Update image if provided
                if (file != null && !file.isEmpty()) {
                    // Normalize file name
                    String fileName =  file.getOriginalFilename();
                    Path imagePath = Paths.get(uploadPath + fileName);

                    // Save the file to the specified location
                    Files.copy(file.getInputStream(), imagePath);

                    // Update the image path
                    candidate.setImagePath(fileName);
                }

                // Save updated candidate details to database
                Candidate updatedCandidate = candidateRepository.save(candidate);
                return new ResponseEntity<>(updatedCandidate, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
   

    // DELETE remove a candidate
    @DeleteMapping("/{aadharcardNumber}")
    public ResponseEntity<HttpStatus> deleteCandidate(@PathVariable String aadharcardNumber) {
        try {
            candidateRepository.deleteById(aadharcardNumber);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
    @Value("${file.upload-dir}")
    private String uploadDir;

    // Endpoint to upload an image
    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            // Ensure the upload directory exists
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Generate a unique filename
            String fileName = file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);

            // Save the file to the "image" folder
            Files.copy(file.getInputStream(), filePath);

            return ResponseEntity.ok("File uploaded successfully: " + fileName);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Failed to upload file: " + e.getMessage());
        }
    }

// lakshmanan 
    @GetMapping("/image/{fileName}")
    public ResponseEntity<Resource> getImage(@PathVariable String fileName) {
        try {
            Path filePath = Paths.get("image").resolve(fileName).normalize();
            System.out.println("File path: " + filePath); // Log the file path
           // filePath=Paths.get("C://Users/iamna/Downloads/CODE/CODE/BACKEND/Voting_Platform_Blockchain/Voting_Platform_Blockchain/image/210de807-7b46-4d91-9ce0-eb32d11fdc22_aaa.jpg");
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(resource);
            } else {
                System.out.println("File not found or not readable: " + fileName); // Log if file is missing
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            System.out.println("Error accessing file: " + e.getMessage()); // Log any errors
            return ResponseEntity.internalServerError().build();
        }
    }

}
