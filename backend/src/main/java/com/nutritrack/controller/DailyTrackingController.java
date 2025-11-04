package com.nutritrack.controller;

import com.nutritrack.model.DailyTracking;
import com.nutritrack.service.DailyTrackingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/daily-trackings")
public class DailyTrackingController {

    @Autowired
    private DailyTrackingService dailyTrackingService;

    @GetMapping
    public List<DailyTracking> getAllDailyTrackings() {
        return dailyTrackingService.getAllDailyTrackings();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DailyTracking> getDailyTrackingById(@PathVariable Long id) {
        return dailyTrackingService.getDailyTrackingById(id)
                .map(dailyTracking -> ResponseEntity.ok().body(dailyTracking))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public DailyTracking createDailyTracking(@RequestBody DailyTracking dailyTracking) {
        return dailyTrackingService.createDailyTracking(dailyTracking);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DailyTracking> updateDailyTracking(@PathVariable Long id, @RequestBody DailyTracking dailyTrackingDetails) {
        DailyTracking updatedDailyTracking = dailyTrackingService.updateDailyTracking(id, dailyTrackingDetails);
        if (updatedDailyTracking != null) {
            return ResponseEntity.ok(updatedDailyTracking);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDailyTracking(@PathVariable Long id) {
        dailyTrackingService.deleteDailyTracking(id);
        return ResponseEntity.noContent().build();
    }
}
