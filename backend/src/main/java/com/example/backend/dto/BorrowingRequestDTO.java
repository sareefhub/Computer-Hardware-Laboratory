package com.example.backend.dto;

import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BorrowingRequestDTO {
    private String studentId;
    private String teacherId;
    private String course;
    private String reason;
    private String notes;
    private String priority;
    private List<ItemDTO> items;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ItemDTO {
        private Integer equipmentId;
        private Integer quantity;
    }
}
