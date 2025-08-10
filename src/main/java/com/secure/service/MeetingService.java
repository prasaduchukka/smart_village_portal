package com.secure.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.secure.entity.Meeting;
import com.secure.repository.MeetingRepository;

@Service
public class MeetingService {
	
	@Autowired
	private MeetingRepository meetingRepository;
	
	public Meeting saveMeeting( Meeting meeting) {
		return meetingRepository.save(meeting);
	}
	
	public List<Meeting> getAllMeetings(){
		return meetingRepository.findAll();
		
	}
	
	public Meeting getMeetingById(Long id) {
		return meetingRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("meeting not found with id: " + id));		
	}
	
	public void deleteMeeting(Long id) {
		meetingRepository.deleteById(id);
	}
	public List<Meeting> getMeetingByCompletionStatus(boolean completed){
		return meetingRepository.findByCompleted(completed);		
	}
	
//	public Meeting updateMeetingStatus(Long id, boolean completed) {
//		Optional<Meeting> optionalMeeting = meetingRepository.findById(id);
//		if(optionalMeeting.isPresent()) {
//			Meeting meeting=optionalMeeting.get();
//			meeting.setCompleted(completed);
//			return meetingRepository.save(meeting);
//		}
//		return null;
//	}
	
	public Meeting updateMeeting(Long id, Meeting updatedMeeting) {
	    return meetingRepository.findById(id).map(meet -> {
	        meet.setTitle(updatedMeeting.getTitle());
	        meet.setDescription(updatedMeeting.getDescription());
	        meet.setScheduledDateTime(updatedMeeting.getScheduledDateTime());
	        meet.setCompleted(updatedMeeting.isCompleted());
	        meet.setLocation(updatedMeeting.getLocation()); // if you have a date field
	        return meetingRepository.save(meet);
	    }).orElseThrow(() -> new RuntimeException("Meeting not found with id: " + id));
	}


}
