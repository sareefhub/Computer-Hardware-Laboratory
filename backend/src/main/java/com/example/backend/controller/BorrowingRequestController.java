package com.example.backend.controller;

import com.example.backend.dto.BorrowingRequestDTO;
import com.example.backend.entity.BorrowingItem;
import com.example.backend.entity.BorrowingRequest;
import com.example.backend.entity.Equipment;
import com.example.backend.entity.SystemSettings;
import com.example.backend.entity.User;
import com.example.backend.repository.BorrowingRequestRepository;
import com.example.backend.repository.EquipmentRepository;
import com.example.backend.repository.SystemSettingsRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/requests")
@RequiredArgsConstructor
public class BorrowingRequestController {

    private final BorrowingRequestRepository requestRepository;
    private final UserRepository userRepository;
    private final EquipmentRepository equipmentRepository;
    private final SystemSettingsRepository systemSettingsRepository;

    @PostMapping
    public ResponseEntity<?> createRequest(@RequestBody BorrowingRequestDTO dto) {
        User student = userRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));
        User teacher = userRepository.findById(dto.getTeacherId())
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        SystemSettings settings = systemSettingsRepository.findTopByOrderByIdDesc()
                .orElseThrow(() -> new RuntimeException("System settings not found"));

        long count = requestRepository.countByStudent_UserId(dto.getStudentId()) + 1;

        String requestId = settings.getCurrentTerm() + "-" +
                settings.getCurrentYear() + "-" +
                student.getStudentCode() + "-" +
                String.format("%03d", count);

        BorrowingRequest request = BorrowingRequest.builder()
                .requestId(requestId)
                .student(student)
                .teacher(teacher)
                .course(dto.getCourse())
                .reason(dto.getReason())
                .notes(dto.getNotes())
                .priority(dto.getPriority())
                .statusCode(1)
                .requestDate(LocalDateTime.now())
                .build();

        List<BorrowingItem> items = dto.getItems().stream().map(itemDTO -> {
            Equipment equipment = equipmentRepository.findById(itemDTO.getEquipmentId())
                    .orElseThrow(() -> new RuntimeException("Equipment not found"));

            return BorrowingItem.builder()
                    .borrowingRequest(request)
                    .equipment(equipment)
                    .quantity(itemDTO.getQuantity())
                    .build();
        }).toList();

        request.setItems(items);

        requestRepository.save(request);
        return ResponseEntity.ok(request);
    }

    @GetMapping
    public ResponseEntity<?> getAllRequests() {
        return ResponseEntity.ok(requestRepository.findAll());
    }

    @PutMapping("/{requestId}/approve")
    public ResponseEntity<?> approveRequest(@PathVariable String requestId) {
        BorrowingRequest request = requestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatusCode(2);
        request.setApprovedDate(LocalDateTime.now());
        requestRepository.save(request);
        return ResponseEntity.ok(request);
    }

    @PutMapping("/{requestId}/reject")
    public ResponseEntity<?> rejectRequest(@PathVariable String requestId, @RequestBody String reason) {
        BorrowingRequest request = requestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatusCode(0);
        request.setRejectedDate(LocalDateTime.now());
        request.setRejectionReason(reason);
        requestRepository.save(request);
        return ResponseEntity.ok(request);
    }

    @PutMapping("/{requestId}/prepare")
    public ResponseEntity<?> prepareRequest(@PathVariable String requestId) {
        BorrowingRequest request = requestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatusCode(3);
        requestRepository.save(request);
        return ResponseEntity.ok(request);
    }

    @PutMapping("/{requestId}/borrow")
    public ResponseEntity<?> borrowRequest(@PathVariable String requestId) {
        BorrowingRequest request = requestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatusCode(4);
        request.setBorrowedDate(LocalDateTime.now());
        requestRepository.save(request);
        return ResponseEntity.ok(request);
    }

    @PutMapping("/{requestId}/return")
    public ResponseEntity<?> returnRequest(@PathVariable String requestId) {
        BorrowingRequest request = requestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatusCode(5);
        request.setReturnedDate(LocalDateTime.now());
        request.getItems().forEach(item -> {
            Equipment eq = item.getEquipment();
            eq.setAvailableQuantity(eq.getAvailableQuantity() + item.getQuantity());
            equipmentRepository.save(eq);
        });
        requestRepository.save(request);
        return ResponseEntity.ok(request);
    }
}
