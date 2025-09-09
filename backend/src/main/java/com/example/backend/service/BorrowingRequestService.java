package com.example.backend.service;

import com.example.backend.entity.BorrowingRequest;
import com.example.backend.repository.BorrowingRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BorrowingRequestService {
    private final BorrowingRequestRepository borrowingRequestRepository;

    public List<BorrowingRequest> findAll() {
        return borrowingRequestRepository.findAll();
    }

    public Optional<BorrowingRequest> findById(String id) {
        return borrowingRequestRepository.findById(id);
    }

    public BorrowingRequest save(BorrowingRequest request) {
        return borrowingRequestRepository.save(request);
    }

    public void delete(String id) {
        borrowingRequestRepository.deleteById(id);
    }
}
