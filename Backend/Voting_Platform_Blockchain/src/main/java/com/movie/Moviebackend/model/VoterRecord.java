package com.movie.Moviebackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name="VoterRecord", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"voterAadhaarCardNumber"})
})
public class VoterRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String voterAadhaarCardNumber; // Unique identifier for the voter
    private String hashedVoterAadhaarCardNumber; // Hashed value for voterAadhaarCardNumber
    private String candidateAadhaarCardNumber;
    private String hashedCandidateAadhaarCardNumber; // Hashed value for candidateAadhaarCardNumber
    private String emblem;
    private String hashedEmblem; // Hashed value for emblem
    private String candidateName;
    private String hashedCandidateName; // Hashed value for candidateName

    // Constructors, getters, setters

    public VoterRecord() {
    }

    public VoterRecord(String voterAadhaarCardNumber, String candidateAadhaarCardNumber, String emblem, String candidateName) {
        this.voterAadhaarCardNumber = voterAadhaarCardNumber;
        this.candidateAadhaarCardNumber = candidateAadhaarCardNumber;
        this.emblem = emblem;
        this.candidateName = candidateName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVoterAadhaarCardNumber() {
        return voterAadhaarCardNumber;
    }

    public void setVoterAadhaarCardNumber(String voterAadhaarCardNumber) {
        this.voterAadhaarCardNumber = voterAadhaarCardNumber;
    }

    public String getHashedVoterAadhaarCardNumber() {
        return hashedVoterAadhaarCardNumber;
    }

    public void setHashedVoterAadhaarCardNumber(String hashedVoterAadhaarCardNumber) {
        this.hashedVoterAadhaarCardNumber = hashedVoterAadhaarCardNumber;
    }

    public String getCandidateAadhaarCardNumber() {
        return candidateAadhaarCardNumber;
    }

    public void setCandidateAadhaarCardNumber(String candidateAadhaarCardNumber) {
        this.candidateAadhaarCardNumber = candidateAadhaarCardNumber;
    }

    public String getHashedCandidateAadhaarCardNumber() {
        return hashedCandidateAadhaarCardNumber;
    }

    public void setHashedCandidateAadhaarCardNumber(String hashedCandidateAadhaarCardNumber) {
        this.hashedCandidateAadhaarCardNumber = hashedCandidateAadhaarCardNumber;
    }

    public String getEmblem() {
        return emblem;
    }

    public void setEmblem(String emblem) {
        this.emblem = emblem;
    }

    public String getHashedEmblem() {
        return hashedEmblem;
    }

    public void setHashedEmblem(String hashedEmblem) {
        this.hashedEmblem = hashedEmblem;
    }

    public String getCandidateName() {
        return candidateName;
    }

    public void setCandidateName(String candidateName) {
        this.candidateName = candidateName;
    }

    public String getHashedCandidateName() {
        return hashedCandidateName;
    }

    public void setHashedCandidateName(String hashedCandidateName) {
        this.hashedCandidateName = hashedCandidateName;
    }
}
