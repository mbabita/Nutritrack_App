package com.nutritrack.config;

import com.nutritrack.model.*;
import com.nutritrack.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DiseaseRepository diseaseRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private NutritionInfoRepository nutritionInfoRepository;

    @Autowired
    private MealPlanRepository mealPlanRepository;

    @Autowired
    private DailyTrackingRepository dailyTrackingRepository;

    @Override
    public void run(String... args) throws Exception {
        // Load sample users
        User user1 = new User("John Doe", "john@example.com", 30, "Male", 75.0, 175.0, LocalDate.of(1993, 5, 15));
        User user2 = new User("Jane Smith", "jane@example.com", 25, "Female", 60.0, 165.0, LocalDate.of(1998, 8, 20));
        userRepository.save(user1);
        userRepository.save(user2);

        // Load sample diseases
        Disease diabetes = new Disease("Diabetes", "A metabolic disorder characterized by high blood sugar levels.");
        Disease hypertension = new Disease("Hypertension", "High blood pressure that can lead to serious health issues.");
        diseaseRepository.save(diabetes);
        diseaseRepository.save(hypertension);

        // Load sample recipes
        Recipe salad = new Recipe("Greek Salad", "A healthy Mediterranean salad", "Mix all ingredients together.", 10, 0, 4);
        Recipe smoothie = new Recipe("Berry Smoothie", "A refreshing fruit smoothie", "Blend all ingredients until smooth.", 5, 0, 2);
        recipeRepository.save(salad);
        recipeRepository.save(smoothie);

        // Load sample nutrition info
        NutritionInfo saladNutrition = new NutritionInfo(200.0, 10.0, 15.0, 12.0, 5.0, 8.0, salad);
        NutritionInfo smoothieNutrition = new NutritionInfo(150.0, 5.0, 30.0, 2.0, 8.0, 20.0, smoothie);
        nutritionInfoRepository.save(saladNutrition);
        nutritionInfoRepository.save(smoothieNutrition);

        // Load sample meal plans
        MealPlan plan1 = new MealPlan("Weight Loss Plan", "A plan focused on healthy eating for weight loss", LocalDate.now(), LocalDate.now().plusDays(30), user1);
        MealPlan plan2 = new MealPlan("Muscle Gain Plan", "A plan for building muscle mass", LocalDate.now(), LocalDate.now().plusDays(30), user2);
        mealPlanRepository.save(plan1);
        mealPlanRepository.save(plan2);

        // Load sample daily trackings
        DailyTracking tracking1 = new DailyTracking(LocalDate.now(), 2.0, 30.0, "Good", 74.5, user1, plan1);
        DailyTracking tracking2 = new DailyTracking(LocalDate.now(), 1.5, 45.0, "Excellent", 60.2, user2, plan2);
        dailyTrackingRepository.save(tracking1);
        dailyTrackingRepository.save(tracking2);
    }
}
