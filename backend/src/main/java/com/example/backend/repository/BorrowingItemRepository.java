package com.example.backend.repository;

import com.example.backend.entity.BorrowingItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BorrowingItemRepository extends JpaRepository<BorrowingItem, Integer> {
}
