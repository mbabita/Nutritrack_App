package com.nutritrack.service;

import com.nutritrack.model.MealPlan;
import com.nutritrack.repository.MealPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MealPlanService {

    @Autowired
    private MealPlanRepository mealPlanRepository;

    public List<MealPlan> getAllMealPlans() {
        return mealPlanRepository.findAll();
    }

    public Optional<MealPlan> getMealPlanById(Long id) {
        return mealPlanRepository.findById(id);
    }

    public MealPlan createMealPlan(MealPlan mealPlan) {
        return mealPlanRepository.save(mealPlan);
    }

    public MealPlan updateMealPlan(Long id, MealPlan mealPlanDetails) {
        Optional<MealPlan> optionalMealPlan = mealPlanRepository.findById(id);
        if (optionalMealPlan.isPresent()) {
            MealPlan mealPlan = optionalMealPlan.get();
            mealPlan.setName(mealPlanDetails.getName());
            mealPlan.setDescription(mealPlanDetails.getDescription());
            mealPlan.setStartDate(mealPlanDetails.getStartDate());
            mealPlan.setEndDate(mealPlanDetails.getEndDate());
            mealPlan.setUser(mealPlanDetails.getUser());
            return mealPlanRepository.save(mealPlan);
        }
        return null;
    }

    public void deleteMealPlan(Long id) {
        mealPlanRepository.deleteById(id);
    }
}
