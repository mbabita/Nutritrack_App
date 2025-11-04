package com.nutritrack.controller;

import com.nutritrack.model.NutritionInfo;
import com.nutritrack.service.NutritionInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nutrition-infos")
public class NutritionInfoController {

    @Autowired
    private NutritionInfoService nutritionInfoService;

    @GetMapping
    public List<NutritionInfo> getAllNutritionInfos() {
        return nutritionInfoService.getAllNutritionInfos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<NutritionInfo> getNutritionInfoById(@PathVariable Long id) {
        return nutritionInfoService.getNutritionInfoById(id)
                .map(nutritionInfo -> ResponseEntity.ok().body(nutritionInfo))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public NutritionInfo createNutritionInfo(@RequestBody NutritionInfo nutritionInfo) {
        return nutritionInfoService.createNutritionInfo(nutritionInfo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<NutritionInfo> updateNutritionInfo(@PathVariable Long id, @RequestBody NutritionInfo nutritionInfoDetails) {
        NutritionInfo updatedNutritionInfo = nutritionInfoService.updateNutritionInfo(id, nutritionInfoDetails);
        if (updatedNutritionInfo != null) {
            return ResponseEntity.ok(updatedNutritionInfo);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNutritionInfo(@PathVariable Long id) {
        nutritionInfoService.deleteNutritionInfo(id);
        return ResponseEntity.noContent().build();
    }
}
