package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "borrowing_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BorrowingRequest {
    @Id
    @Column(name = "request_id", nullable = false, updatable = false)
    private String requestId;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @ManyToOne
    @JoinColumn(name = "teacher_id", nullable = false)
    private User teacher;

    private String course;

    @Column(columnDefinition = "TEXT")
    private String reason;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(nullable = false, updatable = false)
    private LocalDateTime requestDate;

    private Integer statusCode;
    private String priority;

    private LocalDateTime borrowedDate;
    private LocalDateTime dueDate;
    private LocalDateTime returnedDate;
    private LocalDateTime approvedDate;
    private LocalDateTime rejectedDate;

    @Column(columnDefinition = "TEXT")
    private String rejectionReason;

    @OneToMany(mappedBy = "borrowingRequest", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<BorrowingItem> items;

    @PrePersist
    public void prePersist() {
        if (requestId == null) {
            requestId = java.util.UUID.randomUUID().toString();
        }
        if (requestDate == null) {
            requestDate = LocalDateTime.now();
        }
        if (statusCode == null) {
            statusCode = 1;
        }
    }
}
