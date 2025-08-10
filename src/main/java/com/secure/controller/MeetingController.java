package com.secure.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.secure.entity.Complaint;
import com.secure.entity.Meeting;
import com.secure.service.MeetingService;

@RestController
@RequestMapping("/meetings")
public class MeetingController {
	
	@Autowired
	private MeetingService meetingService;
	
	@PostMapping("/submit")
	public Meeting submitMeeting(@RequestBody Meeting meeting) {
		meeting.setScheduledDateTime(LocalDateTime.now());
		return meetingService.saveMeeting(meeting);
		
	}
	
	@GetMapping("/all")
	public List<Meeting> getAllMeetings(){
		return meetingService.getAllMeetings();
	}
	
	@PutMapping("/status/{id}")
	public Meeting UpdateMeetStatus(@PathVariable Long id) {
		Meeting meeting=meetingService.getMeetingById(id);
		meeting.setCompleted(!meeting.isCompleted());
		return meetingService.saveMeeting(meeting);
	}
	

	
	@PutMapping("/update/{id}")
	public Meeting UpdateMeeting(@PathVariable Long id,@RequestBody Meeting updateMeeting) {
		return meetingService.updateMeeting(id, updateMeeting);
	}
	
	@DeleteMapping("/{id}")
	public void deleteMeeting(@PathVariable Long id) {
		meetingService.deleteMeeting(id);
	}

}
