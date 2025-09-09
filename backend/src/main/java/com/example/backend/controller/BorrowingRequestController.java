package com.example.backend.controller;

import com.example.backend.dto.BorrowingRequestDTO;
import com.example.backend.entity.BorrowingItem;
import com.example.backend.entity.BorrowingRequest;
import com.example.backend.entity.Equipment;
import com.example.backend.entity.User;
import com.example.backend.repository.BorrowingRequestRepository;
import com.example.backend.repository.EquipmentRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/requests")
@RequiredArgsConstructor
public class BorrowingRequestController {

    private final BorrowingRequestRepository requestRepository;
    private final UserRepository userRepository;
    private final EquipmentRepository equipmentRepository;

    @PostMapping
    public ResponseEntity<?> createRequest(@RequestBody BorrowingRequestDTO dto) {
        User student = userRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));
        User teacher = userRepository.findById(dto.getTeacherId())
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        BorrowingRequest request = BorrowingRequest.builder()
                .requestId(UUID.randomUUID().toString())
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
}
