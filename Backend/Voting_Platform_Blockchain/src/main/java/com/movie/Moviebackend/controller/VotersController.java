package com.movie.Moviebackend.controller;

import com.movie.Moviebackend.model.Voters;
import com.movie.Moviebackend.repository.VotersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/voters")
public class VotersController {

    private final VotersRepository votersRepository;

    @Autowired
    public VotersController(VotersRepository votersRepository) {
        this.votersRepository = votersRepository;
    }

    // Endpoint to create a new voter
    @PostMapping
    public ResponseEntity<Voters> createVoter(@RequestBody Voters voter) {
        // Check if a voter with the same aadharcardNumber already exists
        Voters existingVoter = votersRepository.findByAadharcardNumber(voter.getAadharcardNumber());
        if (existingVoter != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build(); // Return 409 Conflict if exists
        }
        
        // Save the new voter
        Voters savedVoter = votersRepository.save(voter);
        return ResponseEntity.ok(savedVoter); // Return 200 OK with the saved voter
    }

    // Other endpoints like update, delete, get by id, etc. can be added as needed
    
 // Endpoint to get voter by Aadharcard number
    @GetMapping("/{aadharcardNumber}")
    public ResponseEntity<Voters> getVoterByAadharcardNumber(@PathVariable String aadharcardNumber) {
        Voters voter = votersRepository.findByAadharcardNumber(aadharcardNumber);
        if (voter != null) {
            return ResponseEntity.ok(voter); // Return 200 OK with the voter object
        } else {
            return ResponseEntity.notFound().build(); // Return 404 Not Found if voter not found
        }
    }

    @GetMapping
    public ResponseEntity<List<Voters>> getAllVoters() {
        List<Voters> voters = votersRepository.findAll();
        if (!voters.isEmpty()) {
            return ResponseEntity.ok(voters); // Return 200 OK with the list of voters
        } else {
            return ResponseEntity.noContent().build(); // Return 204 No Content if no voters found
        }
    }

}
