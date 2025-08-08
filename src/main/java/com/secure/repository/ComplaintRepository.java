package com.secure.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.secure.entity.Complaint;

public interface ComplaintRepository extends JpaRepository<Complaint, Long>{

}
