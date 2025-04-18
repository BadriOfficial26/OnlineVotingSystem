package com.movie.Moviebackend.repository;

import com.movie.Moviebackend.model.Voters;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VotersRepository extends JpaRepository<Voters, String> {
    Voters findByAadharcardNumber(String aadharcardNumber);
}
