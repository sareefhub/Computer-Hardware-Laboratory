package com.example.backend.controller;

import com.example.backend.entity.SystemSettings;
import com.example.backend.service.SystemSettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/settings")
@RequiredArgsConstructor
public class SystemSettingsController {
    private final SystemSettingsService systemSettingsService;

    @GetMapping
    public List<SystemSettings> getAllSettings() {
        return systemSettingsService.findAll();
    }

    @GetMapping("/{id}")
    public SystemSettings getSettingsById(@PathVariable Integer id) {
        return systemSettingsService.findById(id).orElse(null);
    }

    @PostMapping
    public SystemSettings createSettings(@RequestBody SystemSettings settings) {
        return systemSettingsService.save(settings);
    }

    @PutMapping("/{id}")
    public SystemSettings updateSettings(@PathVariable Integer id, @RequestBody SystemSettings settings) {
        settings.setId(id);
        return systemSettingsService.save(settings);
    }

    @DeleteMapping("/{id}")
    public void deleteSettings(@PathVariable Integer id) {
        systemSettingsService.delete(id);
    }
}
