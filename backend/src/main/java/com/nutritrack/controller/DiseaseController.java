package com.nutritrack.controller;

import com.nutritrack.model.Disease;
import com.nutritrack.service.DiseaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/diseases")
public class DiseaseController {

    @Autowired
    private DiseaseService diseaseService;

    @GetMapping
    public List<Disease> getAllDiseases() {
        return diseaseService.getAllDiseases();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Disease> getDiseaseById(@PathVariable Long id) {
        return diseaseService.getDiseaseById(id)
                .map(disease -> ResponseEntity.ok().body(disease))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Disease createDisease(@RequestBody Disease disease) {
        return diseaseService.createDisease(disease);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Disease> updateDisease(@PathVariable Long id, @RequestBody Disease diseaseDetails) {
        Disease updatedDisease = diseaseService.updateDisease(id, diseaseDetails);
        if (updatedDisease != null) {
            return ResponseEntity.ok(updatedDisease);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDisease(@PathVariable Long id) {
        diseaseService.deleteDisease(id);
        return ResponseEntity.noContent().build();
    }
}
