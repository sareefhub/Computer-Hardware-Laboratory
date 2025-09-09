package com.example.backend.service;

import com.example.backend.entity.SystemSettings;
import com.example.backend.repository.SystemSettingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SystemSettingsService {
    private final SystemSettingsRepository systemSettingsRepository;

    public List<SystemSettings> findAll() {
        return systemSettingsRepository.findAll();
    }

    public Optional<SystemSettings> findById(Integer id) {
        return systemSettingsRepository.findById(id);
    }

    public SystemSettings save(SystemSettings settings) {
        return systemSettingsRepository.save(settings);
    }

    public void delete(Integer id) {
        systemSettingsRepository.deleteById(id);
    }
}
