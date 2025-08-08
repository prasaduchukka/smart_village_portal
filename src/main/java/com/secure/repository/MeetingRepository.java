package com.secure.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.secure.entity.Meeting;

public interface MeetingRepository extends JpaRepository<Meeting, Long>{
	
	List<Meeting> findByCompleted(boolean completed);
	

}
