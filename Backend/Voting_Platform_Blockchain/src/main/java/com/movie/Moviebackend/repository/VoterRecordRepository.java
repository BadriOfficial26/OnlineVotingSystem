package com.movie.Moviebackend.repository;

import com.movie.Moviebackend.model.VoterRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VoterRecordRepository extends JpaRepository<VoterRecord, Long> {
    Optional<VoterRecord> findByVoterAadhaarCardNumber(String voterAadhaarCardNumber);
}
