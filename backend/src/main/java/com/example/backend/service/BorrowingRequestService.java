package com.example.backend.service;

import com.example.backend.dto.BorrowingRequestDTO;
import com.example.backend.entity.BorrowingItem;
import com.example.backend.entity.BorrowingRequest;
import com.example.backend.entity.Equipment;
import com.example.backend.entity.User;
import com.example.backend.repository.BorrowingRequestRepository;
import com.example.backend.repository.EquipmentRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BorrowingRequestService {
    private final BorrowingRequestRepository borrowingRequestRepository;
    private final UserRepository userRepository;
    private final EquipmentRepository equipmentRepository;

    public List<BorrowingRequest> findAll() {
        return borrowingRequestRepository.findAll();
    }

    public Optional<BorrowingRequest> findById(String id) {
        return borrowingRequestRepository.findById(id);
    }

    public List<BorrowingRequest> findByStudentCode(String studentCode) {
        return borrowingRequestRepository.findByStudent_StudentCode(studentCode);
    }

    public BorrowingRequest save(BorrowingRequestDTO dto) {
        User student = userRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));
        User teacher = userRepository.findById(dto.getTeacherId())
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        String requestId = generateRequestId(student);

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

        List<BorrowingItem> items = dto.getItems().stream().map(i -> {
            Equipment eq = equipmentRepository.findById(i.getEquipmentId())
                    .orElseThrow(() -> new RuntimeException("Equipment not found"));
            eq.setAvailableQuantity(eq.getAvailableQuantity() - i.getQuantity());
            equipmentRepository.save(eq);

            return BorrowingItem.builder()
                    .borrowingRequest(request)
                    .equipment(eq)
                    .quantity(i.getQuantity())
                    .build();
        }).collect(Collectors.toList());

        request.setItems(items);

        return borrowingRequestRepository.save(request);
    }

    public BorrowingRequest approve(String requestId) {
        BorrowingRequest request = borrowingRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatusCode(2);
        request.setApprovedDate(LocalDateTime.now());
        return borrowingRequestRepository.save(request);
    }

    public BorrowingRequest reject(String requestId, String reason) {
        BorrowingRequest request = borrowingRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatusCode(0);
        request.setRejectedDate(LocalDateTime.now());
        request.setRejectionReason(reason);
        return borrowingRequestRepository.save(request);
    }

    public BorrowingRequest prepare(String requestId) {
        BorrowingRequest request = borrowingRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatusCode(3);
        return borrowingRequestRepository.save(request);
    }

    public BorrowingRequest borrow(String requestId) {
        BorrowingRequest request = borrowingRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatusCode(4);
        request.setBorrowedDate(LocalDateTime.now());
        return borrowingRequestRepository.save(request);
    }

    public BorrowingRequest returnRequest(String requestId) {
        BorrowingRequest request = borrowingRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatusCode(5);
        request.setReturnedDate(LocalDateTime.now());
        request.getItems().forEach(item -> {
            Equipment eq = item.getEquipment();
            eq.setAvailableQuantity(eq.getAvailableQuantity() + item.getQuantity());
            equipmentRepository.save(eq);
        });
        return borrowingRequestRepository.save(request);
    }

    public String generateRequestId(User student) {
        String studentCode = student.getStudentCode();
        String year = String.valueOf(LocalDateTime.now().getYear() + 543);
        long count = borrowingRequestRepository.count() + 1;
        return count + "-" + year + "-" + studentCode + "-" + String.format("%03d", count);
    }

    public BorrowingRequestDTO toDto(BorrowingRequest request) {
        return BorrowingRequestDTO.builder()
                .requestId(request.getRequestId())
                .course(request.getCourse())
                .reason(request.getReason())
                .notes(request.getNotes())
                .priority(request.getPriority())
                .statusCode(request.getStatusCode())
                .requestDate(request.getRequestDate())
                .studentId(request.getStudent().getUserId())
                .studentName(request.getStudent().getName())
                .studentCode(request.getStudent().getStudentCode())
                .teacherId(request.getTeacher().getUserId())
                .items(request.getItems().stream().map(item ->
                        BorrowingRequestDTO.ItemDTO.builder()
                                .equipmentId(item.getEquipment().getEquipmentId())
                                .quantity(item.getQuantity())
                                .equipmentName(item.getEquipment().getName())
                                .build()
                ).toList())
                .build();
    }
}
