package com.example.backend.dto;

import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BorrowingRequestDTO {
    private String requestId;
    private String course;
    private String reason;
    private String notes;
    private String priority;
    private Integer statusCode;
    private LocalDateTime requestDate;

    private String studentId;
    private String studentName;

    private String teacherId;
    private String teacherName;

    private List<ItemDTO> items;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ItemDTO {
        private Integer equipmentId;
        private String equipmentName;
        private Integer quantity;
    }
}
