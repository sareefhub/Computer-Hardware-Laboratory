package com.example.backend.service;

import com.example.backend.entity.Equipment;
import com.example.backend.repository.EquipmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EquipmentService {
    private final EquipmentRepository equipmentRepository;

    public List<Equipment> findAll() {
        return equipmentRepository.findAll();
    }

    public Optional<Equipment> findById(Integer id) {
        return equipmentRepository.findById(id);
    }

    public Equipment save(Equipment equipment) {
        return equipmentRepository.save(equipment);
    }

    public void delete(Integer id) {
        equipmentRepository.deleteById(id);
    }
}
