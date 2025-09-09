package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "borrowing_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BorrowingItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "request_id")
    private BorrowingRequest borrowingRequest;

    @ManyToOne
    @JoinColumn(name = "equipment_id")
    private Equipment equipment;

    private Integer quantity;
}
