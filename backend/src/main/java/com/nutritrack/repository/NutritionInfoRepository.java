package com.nutritrack.repository;

import com.nutritrack.model.NutritionInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NutritionInfoRepository extends JpaRepository<NutritionInfo, Long> {
}
