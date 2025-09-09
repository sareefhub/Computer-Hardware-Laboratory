package com.example.backend.repository;

import com.example.backend.entity.SystemSettings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SystemSettingsRepository extends JpaRepository<SystemSettings, Integer> {
}
