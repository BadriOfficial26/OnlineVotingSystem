package com.movie.Moviebackend.model;

import jakarta.persistence.*;
import java.sql.Date;
import java.util.List;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "Voters")
public class Voters
{
	    @Id
	    private String aadharcardNumber;
	    private String firstname;
	    private String lastname;
	    private String emailid;
	    private String password;
	    private String address;
	    private String city;
	    private String state;
	    private String phoneNumber;

	    // Constructors, getters, setters
	    // Omitted for brevity

	    public String getAadharcardNumber() {
	        return aadharcardNumber;
	    }

	    public void setAadharcardNumber(String aadharcardNumber) {
	        this.aadharcardNumber = aadharcardNumber;
	    }

	    
	    public Voters()
	    {
	    	
	    }
	    
		public Voters(Long id, String firstname, String lastname, String emailid, String aadharcardNumber,
				String password, String address, String city, String state, String phoneNumber) {
			
			this.firstname = firstname;
			this.lastname = lastname;
			this.emailid = emailid;
			this.aadharcardNumber = aadharcardNumber;
			this.password = password;
			this.address = address;
			this.city = city;
			this.state = state;
			this.phoneNumber = phoneNumber;
		}
	
		public String getFirstname() {
			return firstname;
		}
		public void setFirstname(String firstname) {
			this.firstname = firstname;
		}
		public String getLastname() {
			return lastname;
		}
		public void setLastname(String lastname) {
			this.lastname = lastname;
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

	    // Constructors, getters, setters
	    // Omitted for brevity
}
