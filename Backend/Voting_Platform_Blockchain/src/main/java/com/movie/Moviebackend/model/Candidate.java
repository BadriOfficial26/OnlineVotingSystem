package com.movie.Moviebackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Candidates")
public class Candidate {

    @Id // Ensure uniqueness through the @Id annotation
    private String aadharcardNumber;

    private String fullname;
    private String emailid;
    private String password;
    private String address;
    private String city;
    private String state;
    private String phoneNumber;
    private String imagePath; // Store relative path to image
    private String candidateName; // New field for candidate name
    private String fileName; // New field for candidate name
    
    private String emblemName;

    // Constructors
    public Candidate() {
        // Default constructor
    }

	public String getAadharcardNumber() {
		return aadharcardNumber;
	}

	public void setAadharcardNumber(String aadharcardNumber) {
		this.aadharcardNumber = aadharcardNumber;
	}

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public String getEmailid() {
		return emailid;
	}

	public void setEmailid(String emailid) {
		this.emailid = emailid;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public String getCandidateName() {
		return candidateName;
	}

	public void setCandidateName(String candidateName) {
		this.candidateName = candidateName;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getEmblemName() {
		return emblemName;
	}

	public void setEmblemName(String emblemName) {
		this.emblemName = emblemName;
	}

	public Candidate(String aadharcardNumber, String fullname, String emailid, String password, String address,
			String city, String state, String phoneNumber, String imagePath, String candidateName, String fileName,
			String emblemName) {
		super();
		this.aadharcardNumber = aadharcardNumber;
		this.fullname = fullname;
		this.emailid = emailid;
		this.password = password;
		this.address = address;
		this.city = city;
		this.state = state;
		this.phoneNumber = phoneNumber;
		this.imagePath = imagePath;
		this.candidateName = candidateName;
		this.fileName = fileName;
		this.emblemName = emblemName;
	}

//    public Candidate(String aadharcardNumber, String fullname, String emailid, String password, String address,
//                     String city, String state, String phoneNumber) {
//        this(aadharcardNumber, fullname, emailid, password, address, city, state, phoneNumber, null, null);
//    }
//
//    public Candidate(String aadharcardNumber, String fullname, String emailid, String password, String address,
//                     String city, String state, String phoneNumber, String imagePath, String candidateName) {
//        this.aadharcardNumber = aadharcardNumber;
//        this.fullname = fullname;
//        this.emailid = emailid;
//        this.password = password;
//        this.address = address;
//        this.city = city;
//        this.state = state;
//        this.phoneNumber = phoneNumber;
//        this.imagePath = imagePath;
//        this.candidateName = candidateName;
//    }
//
//    // Getters and Setters
//    public String getAadharcardNumber() {
//        return aadharcardNumber;
//    }
//
//    public void setAadharcardNumber(String aadharcardNumber) {
//        this.aadharcardNumber = aadharcardNumber;
//    }
//
//    public String getFullname() {
//        return fullname;
//    }
//
//    public void setFullname(String fullname) {
//        this.fullname = fullname;
//    }
//
//    public String getEmailid() {
//        return emailid;
//    }
//
//    public void setEmailid(String emailid) {
//        this.emailid = emailid;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }
//
//    public String getAddress() {
//        return address;
//    }
//
//    public void setAddress(String address) {
//        this.address = address;
//    }
//
//    public String getCity() {
//        return city;
//    }
//
//    public void setCity(String city) {
//        this.city = city;
//    }
//
//    public String getState() {
//        return state;
//    }
//
//    public void setState(String state) {
//        this.state = state;
//    }
//
//    public String getPhoneNumber() {
//        return phoneNumber;
//    }
//
//    public void setPhoneNumber(String phoneNumber) {
//        this.phoneNumber = phoneNumber;
//    }
//
//    public String getImagePath() {
//        return imagePath;
//    }
//
//    public void setImagePath(String imagePath) {
//        this.imagePath = imagePath;
//    }
//
//    public String getCandidateName() {
//        return candidateName;
//    }
//
//    public void setCandidateName(String candidateName) {
//        this.candidateName = candidateName;
//    }
}
