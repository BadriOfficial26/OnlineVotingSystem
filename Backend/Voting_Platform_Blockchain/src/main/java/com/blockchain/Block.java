package com.blockchain;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name = "block", uniqueConstraints = {@UniqueConstraint(columnNames = "voterAadhaarCardNumber")})
public class Block implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int index;
    private long timestamp;

    @Column(name = "voterAadhaarCardNumber", unique = true)
    private String voterAadhaarCardNumber;

    private String candidateAadhaarCardNumber;
    private String emblem;
    private String candidateName;
    private String previousHash;
    private String hash;

    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}

	public long getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(long timestamp) {
		this.timestamp = timestamp;
	}

	public String getVoterAadhaarCardNumber() {
		return voterAadhaarCardNumber;
	}

	public void setVoterAadhaarCardNumber(String voterAadhaarCardNumber) {
		this.voterAadhaarCardNumber = voterAadhaarCardNumber;
	}

	public String getCandidateAadhaarCardNumber() {
		return candidateAadhaarCardNumber;
	}

	public void setCandidateAadhaarCardNumber(String candidateAadhaarCardNumber) {
		this.candidateAadhaarCardNumber = candidateAadhaarCardNumber;
	}

	public String getEmblem() {
		return emblem;
	}

	public void setEmblem(String emblem) {
		this.emblem = emblem;
	}

	public String getCandidateName() {
		return candidateName;
	}

	public void setCandidateName(String candidateName) {
		this.candidateName = candidateName;
	}

	public String getPreviousHash() {
		return previousHash;
	}

	public void setPreviousHash(String previousHash) {
		this.previousHash = previousHash;
	}

	public String getHash() {
		return hash;
	}

	public void setHash(String hash) {
		this.hash = hash;
	}

	public Block() {}

    public Block(int index, String voterAadhaarCardNumber, String candidateAadhaarCardNumber, String emblem, String candidateName, String previousHash) {
        this.index = index;
        this.timestamp = new java.util.Date().getTime();
        this.voterAadhaarCardNumber = voterAadhaarCardNumber;
        this.candidateAadhaarCardNumber = candidateAadhaarCardNumber;
        this.emblem = emblem;
        this.candidateName = candidateName;
        this.previousHash = previousHash;
        this.hash = calculateHash();
    }

    public String calculateHash() {
        try {
            String input = index + previousHash + timestamp + voterAadhaarCardNumber + candidateAadhaarCardNumber + emblem + candidateName;
            java.security.MessageDigest digest = java.security.MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(input.getBytes("UTF-8"));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hashBytes) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // Getters and setters...
}
