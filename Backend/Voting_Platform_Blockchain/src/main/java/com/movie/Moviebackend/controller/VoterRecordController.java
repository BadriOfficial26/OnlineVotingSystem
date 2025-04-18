package com.movie.Moviebackend.controller;

import com.movie.Moviebackend.model.VoterRecord;
import com.movie.Moviebackend.repository.VoterRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@RestController
@RequestMapping("/api/voter-records")
public class VoterRecordController {

    private final VoterRecordRepository voterRecordRepository;

    @Autowired
    public VoterRecordController(VoterRecordRepository voterRecordRepository) {
        this.voterRecordRepository = voterRecordRepository;
    }

    // Get all voter records
    @GetMapping
    public ResponseEntity<List<VoterRecord>> getAllVoterRecords() {
        List<VoterRecord> voterRecords = voterRecordRepository.findAll();
        return new ResponseEntity<>(voterRecords, HttpStatus.OK);
    }

    // Get voter record by ID
    @GetMapping("/{id}")
    public ResponseEntity<VoterRecord> getVoterRecordById(@PathVariable Long id) {
        Optional<VoterRecord> voterRecord = voterRecordRepository.findById(id);
        return voterRecord.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new voter record
    @PostMapping
    public ResponseEntity<?> createVoterRecord(@RequestBody VoterRecord voterRecord) {
        // Check if a record with the same voterAadhaarCardNumber already exists
        Optional<VoterRecord> existingRecord = voterRecordRepository.findByVoterAadhaarCardNumber(voterRecord.getVoterAadhaarCardNumber());
        if (existingRecord.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Voter record with this Aadhaar card number already exists");
        } else {
            // Hash sensitive fields before saving
            hashAndSetSensitiveFields(voterRecord);
            
            VoterRecord newVoterRecord = voterRecordRepository.save(voterRecord);
            return new ResponseEntity<>(newVoterRecord, HttpStatus.CREATED);
        }
    }

    // Update an existing voter record
    @PutMapping("/{id}")
    public ResponseEntity<VoterRecord> updateVoterRecord(@PathVariable Long id, @RequestBody VoterRecord updatedVoterRecord) {
        Optional<VoterRecord> existingRecord = voterRecordRepository.findById(id);
        if (existingRecord.isPresent()) {
            // Hash sensitive fields before updating
            hashAndSetSensitiveFields(updatedVoterRecord);
            
            updatedVoterRecord.setId(id);
            VoterRecord savedRecord = voterRecordRepository.save(updatedVoterRecord);
            return ResponseEntity.ok(savedRecord);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a voter record by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVoterRecord(@PathVariable Long id) {
        voterRecordRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Method to hash sensitive fields and set hashed values in VoterRecord
    private void hashAndSetSensitiveFields(VoterRecord voterRecord) {
        voterRecord.setHashedVoterAadhaarCardNumber(hashString(voterRecord.getVoterAadhaarCardNumber()));
        voterRecord.setHashedCandidateAadhaarCardNumber(hashString(voterRecord.getCandidateAadhaarCardNumber()));
        voterRecord.setHashedEmblem(hashString(voterRecord.getEmblem()));
        voterRecord.setHashedCandidateName(hashString(voterRecord.getCandidateName()));
    }

    // Method to hash a string using SHA-256
    private String hashString(String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] digest = md.digest(input.getBytes());
            StringBuilder hexString = new StringBuilder();
            
            for (byte b : digest) {
                hexString.append(String.format("%02x", b));
            }
            
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace(); // Handle appropriately
            return null;
        }
    }
}
