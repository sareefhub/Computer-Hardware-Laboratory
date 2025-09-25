package com.example.backend.controller;

import com.example.backend.entity.Equipment;
import com.example.backend.service.EquipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/equipments")
@RequiredArgsConstructor
public class EquipmentController {
    private final EquipmentService equipmentService;

    @GetMapping
    public List<Equipment> getAllEquipments() {
        return equipmentService.findAll();
    }

    @GetMapping("/{id}")
    public Equipment getEquipmentById(@PathVariable Integer id) {
        return equipmentService.findById(id).orElse(null);
    }

    @PostMapping
    public Equipment createEquipment(@RequestBody Equipment equipment) {
        return equipmentService.save(equipment);
    }

    @PostMapping("/bulk")
    public List<Equipment> createEquipments(@RequestBody List<Equipment> equipments) {
        return equipmentService.saveAll(equipments);
    }

    @PutMapping("/{id}")
    public Equipment updateEquipment(@PathVariable Integer id, @RequestBody Equipment equipment) {
        equipment.setEquipmentId(id);
        return equipmentService.save(equipment);
    }

    @DeleteMapping("/{id}")
    public void deleteEquipment(@PathVariable Integer id) {
        equipmentService.delete(id);
    }
}
