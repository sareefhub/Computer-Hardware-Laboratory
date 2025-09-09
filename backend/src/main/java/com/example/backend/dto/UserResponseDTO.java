package com.example.backend.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDTO {
    private String userId;
    private String username;
    private String name;
    private String email;
    private String department;
    private String role;
    private String studentCode;
    private LocalDateTime createdAt;
}
