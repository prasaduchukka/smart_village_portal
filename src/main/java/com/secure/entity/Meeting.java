package com.secure.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Meeting {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	
	private Long id;
	
	private String title;
	
	@Column(length=1000)
	private String description;
	
	private LocalDateTime scheduledDateTime;
	
	private String location;
	
	private boolean completed=false;
	
	public Meeting() {
		
	}

	public Meeting(Long id, String title, String description, LocalDateTime scheduledDateTime, String location) {
		this.title = title;
		this.description = description;
		this.scheduledDateTime = scheduledDateTime;
		this.location = location;
		
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

	public LocalDateTime getScheduledDateTime() {
		return scheduledDateTime;
	}

	public void setScheduledDateTime(LocalDateTime scheduledDateTime) {
		this.scheduledDateTime = scheduledDateTime;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public boolean isCompleted() {
		return completed;
	}

	public void setCompleted(boolean completed) {
		this.completed = completed;
	}
	
	
	

}
