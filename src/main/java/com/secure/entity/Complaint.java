package com.secure.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Complaint {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	private String title;
	private String description;
	private String submittedBy;
	private LocalDate date;
	
	@Column(name = "resolved", nullable = false)
    private Boolean resolved = false;  // default is false
	
	public Complaint() {
		
	}

	public Complaint(String title, String description, String submittedBy, LocalDate date) {
		
		this.title = title;
		this.description = description;
		this.submittedBy = submittedBy;
		this.date = date;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getSubmittedBy() {
		return submittedBy;
	}

	public void setSubmittedBy(String submittedBy) {
		this.submittedBy = submittedBy;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}
	
    public boolean isResolved() {
        return resolved;
    }

    public void setResolved(boolean resolved) {
        this.resolved = resolved;
    }
	
	
	

}
