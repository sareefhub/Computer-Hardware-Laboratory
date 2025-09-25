package com.example.backend.controller;

import com.example.backend.dto.BorrowingRequestDTO;
import com.example.backend.entity.BorrowingRequest;
import com.example.backend.service.BorrowingRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/borrowing-requests")
@RequiredArgsConstructor
public class BorrowingRequestController {

    private final BorrowingRequestService borrowingRequestService;

    @PostMapping
    public ResponseEntity<?> createRequest(@RequestBody BorrowingRequestDTO dto) {
        BorrowingRequest request = borrowingRequestService.save(dto);
        return ResponseEntity.ok(borrowingRequestService.toDto(request));
    }

    @GetMapping
    public ResponseEntity<?> getAllRequests() {
        List<BorrowingRequestDTO> dtos = borrowingRequestService.findAll().stream()
                .map(borrowingRequestService::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/student/{studentCode}")
    public ResponseEntity<?> getRequestsByStudent(@PathVariable String studentCode) {
        List<BorrowingRequestDTO> dtos = borrowingRequestService.findByStudentCode(studentCode).stream()
                .map(borrowingRequestService::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PutMapping("/{requestId}/approve")
    public ResponseEntity<?> approveRequest(@PathVariable String requestId) {
        BorrowingRequest request = borrowingRequestService.approve(requestId);
        return ResponseEntity.ok(borrowingRequestService.toDto(request));
    }

    @PutMapping("/{requestId}/reject")
    public ResponseEntity<?> rejectRequest(@PathVariable String requestId, @RequestBody String reason) {
        BorrowingRequest request = borrowingRequestService.reject(requestId, reason);
        return ResponseEntity.ok(borrowingRequestService.toDto(request));
    }

    @PutMapping("/{requestId}/prepare")
    public ResponseEntity<?> prepareRequest(@PathVariable String requestId) {
        BorrowingRequest request = borrowingRequestService.prepare(requestId);
        return ResponseEntity.ok(borrowingRequestService.toDto(request));
    }

    @PutMapping("/{requestId}/borrow")
    public ResponseEntity<?> borrowRequest(@PathVariable String requestId) {
        BorrowingRequest request = borrowingRequestService.borrow(requestId);
        return ResponseEntity.ok(borrowingRequestService.toDto(request));
    }

    @PutMapping("/{requestId}/return")
    public ResponseEntity<?> returnRequest(@PathVariable String requestId) {
        BorrowingRequest request = borrowingRequestService.returnRequest(requestId);
        return ResponseEntity.ok(borrowingRequestService.toDto(request));
    }
}
