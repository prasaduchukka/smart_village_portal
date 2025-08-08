package com.secure.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.secure.entity.Complaint;
import com.secure.service.ComplaintService;

@RestController
@RequestMapping("/complaint")
public class ComplaintController {

	@Autowired
	private ComplaintService complaintService;
	
	@PostMapping("/submit")
	public Complaint submitComplaint(@RequestBody Complaint complaint) {
		complaint.setDate(LocalDate.now());
		return complaintService.saveComplaint(complaint);
	}
	
	@GetMapping("/all")
	public List<Complaint> getAllComplaints(){
		return complaintService.getAllComplaints();
	}
	
	@PutMapping("/update/{id}")
	public Complaint updateComplaint(@PathVariable Long id,@RequestBody Complaint updateComplaint) {
		return complaintService.updateComplaint(id, updateComplaint);
	}
	
	@DeleteMapping("/{id}")
	public void deleteComplaint(@PathVariable Long id) {
		complaintService.deleteComplaint(id);
	}
	
	@PutMapping("/resolve/{id}")
	public Complaint toggleResolved(@PathVariable Long id) {
	    Complaint complaint = complaintService.getComplaintById(id);
	    complaint.setResolved(!complaint.isResolved());
	    return complaintService.saveComplaint(complaint);
	}

}
