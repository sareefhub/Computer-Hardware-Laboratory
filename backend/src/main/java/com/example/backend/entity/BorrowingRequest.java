package com.example.backend.entity;

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
    @Column(name = "request_id")
    private String requestId;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private User student;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private User teacher;

    private String course;

    @Column(columnDefinition = "TEXT")
    private String reason;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
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

    @OneToMany(mappedBy = "borrowingRequest", cascade = CascadeType.ALL)
    private List<BorrowingItem> items;

    @PrePersist
    public void prePersist() {
        if (requestDate == null) {
            requestDate = LocalDateTime.now();
        }
    }
}
