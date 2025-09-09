package com.example.backend.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EquipmentDTO {
    private String name;
    private String category;
    private String description;
    private Integer totalQuantity;
    private Integer availableQuantity;
    private String location;
    private String condition;
    private String imageUrl;
}
