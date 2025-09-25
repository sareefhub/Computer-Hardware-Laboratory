package com.example.backend.repository;

import com.example.backend.entity.BorrowingRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BorrowingRequestRepository extends JpaRepository<BorrowingRequest, String> {
    List<BorrowingRequest> findByStudent_StudentCode(String studentCode);
}
