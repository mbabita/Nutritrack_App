package com.nutritrack.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "daily_trackings")
public class DailyTracking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate date;

    private Double waterIntake; // in liters
    private Double exerciseDuration; // in minutes
    private String mood;
    private Double weight; // in kg

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "meal_plan_id")
    private MealPlan mealPlan;

    // Constructors
    public DailyTracking() {}

    public DailyTracking(LocalDate date, Double waterIntake, Double exerciseDuration, String mood, Double weight, User user, MealPlan mealPlan) {
        this.date = date;
        this.waterIntake = waterIntake;
        this.exerciseDuration = exerciseDuration;
        this.mood = mood;
        this.weight = weight;
        this.user = user;
        this.mealPlan = mealPlan;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public Double getWaterIntake() { return waterIntake; }
    public void setWaterIntake(Double waterIntake) { this.waterIntake = waterIntake; }

    public Double getExerciseDuration() { return exerciseDuration; }
    public void setExerciseDuration(Double exerciseDuration) { this.exerciseDuration = exerciseDuration; }

    public String getMood() { return mood; }
    public void setMood(String mood) { this.mood = mood; }

    public Double getWeight() { return weight; }
    public void setWeight(Double weight) { this.weight = weight; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public MealPlan getMealPlan() { return mealPlan; }
    public void setMealPlan(MealPlan mealPlan) { this.mealPlan = mealPlan; }
}
