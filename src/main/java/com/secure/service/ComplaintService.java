package com.secure.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.secure.entity.Complaint;
import com.secure.repository.ComplaintRepository;

@Service
public class ComplaintService {
	
	@Autowired
	private ComplaintRepository complaintRepository;
	
	public Complaint saveComplaint(Complaint complaint) {
		return complaintRepository.save(complaint);
	}
	
	public List<Complaint> getAllComplaints(){
		return complaintRepository.findAll();
	}
	
	public Complaint updateComplaint(Long id,Complaint updateComplaint) {
		return complaintRepository.findById(id).map(com->{
			com.setTitle(com.getTitle());
			com.setDescription(com.getDescription());
			com.setSubmittedBy(com.getSubmittedBy());
			com.setDate(updateComplaint.getDate());
			com.setResolved(updateComplaint.isResolved());
			
			return complaintRepository.save(updateComplaint);
		}).orElseThrow(()-> new RuntimeException("Complaint not found with id: " + id));
	}
	
	public void deleteComplaint(Long id) {
		complaintRepository.deleteById(id);
	}
	
	public Complaint getComplaintById(Long id) {
		return complaintRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Complaint not found with id: " + id));
	}

}
