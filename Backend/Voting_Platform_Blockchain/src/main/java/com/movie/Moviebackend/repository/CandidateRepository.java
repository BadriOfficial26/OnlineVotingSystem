package com.movie.Moviebackend.repository;

import com.movie.Moviebackend.model.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, String> {

    Candidate findByAadharcardNumber(String aadharcardNumber);

}
