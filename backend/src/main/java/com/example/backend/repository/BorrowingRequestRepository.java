package com.example.backend.repository;

import com.example.backend.entity.BorrowingRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BorrowingRequestRepository extends JpaRepository<BorrowingRequest, String> {
    long countByStudent_UserId(String userId);
}
