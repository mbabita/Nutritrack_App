package com.nutritrack.service;

import com.nutritrack.model.DailyTracking;
import com.nutritrack.repository.DailyTrackingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DailyTrackingService {

    @Autowired
    private DailyTrackingRepository dailyTrackingRepository;

    public List<DailyTracking> getAllDailyTrackings() {
        return dailyTrackingRepository.findAll();
    }

    public Optional<DailyTracking> getDailyTrackingById(Long id) {
        return dailyTrackingRepository.findById(id);
    }

    public DailyTracking createDailyTracking(DailyTracking dailyTracking) {
        return dailyTrackingRepository.save(dailyTracking);
    }

    public DailyTracking updateDailyTracking(Long id, DailyTracking dailyTrackingDetails) {
        Optional<DailyTracking> optionalDailyTracking = dailyTrackingRepository.findById(id);
        if (optionalDailyTracking.isPresent()) {
            DailyTracking dailyTracking = optionalDailyTracking.get();
            dailyTracking.setDate(dailyTrackingDetails.getDate());
            dailyTracking.setWaterIntake(dailyTrackingDetails.getWaterIntake());
            dailyTracking.setExerciseDuration(dailyTrackingDetails.getExerciseDuration());
            dailyTracking.setMood(dailyTrackingDetails.getMood());
            dailyTracking.setWeight(dailyTrackingDetails.getWeight());
            dailyTracking.setUser(dailyTrackingDetails.getUser());
            dailyTracking.setMealPlan(dailyTrackingDetails.getMealPlan());
            return dailyTrackingRepository.save(dailyTracking);
        }
        return null;
    }

    public void deleteDailyTracking(Long id) {
        dailyTrackingRepository.deleteById(id);
    }
}
