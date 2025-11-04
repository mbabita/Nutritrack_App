package com.nutritrack.service;

import com.nutritrack.model.NutritionInfo;
import com.nutritrack.repository.NutritionInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NutritionInfoService {

    @Autowired
    private NutritionInfoRepository nutritionInfoRepository;

    public List<NutritionInfo> getAllNutritionInfos() {
        return nutritionInfoRepository.findAll();
    }

    public Optional<NutritionInfo> getNutritionInfoById(Long id) {
        return nutritionInfoRepository.findById(id);
    }

    public NutritionInfo createNutritionInfo(NutritionInfo nutritionInfo) {
        return nutritionInfoRepository.save(nutritionInfo);
    }

    public NutritionInfo updateNutritionInfo(Long id, NutritionInfo nutritionInfoDetails) {
        Optional<NutritionInfo> optionalNutritionInfo = nutritionInfoRepository.findById(id);
        if (optionalNutritionInfo.isPresent()) {
            NutritionInfo nutritionInfo = optionalNutritionInfo.get();
            nutritionInfo.setCalories(nutritionInfoDetails.getCalories());
            nutritionInfo.setProtein(nutritionInfoDetails.getProtein());
            nutritionInfo.setCarbs(nutritionInfoDetails.getCarbs());
            nutritionInfo.setFat(nutritionInfoDetails.getFat());
            nutritionInfo.setFiber(nutritionInfoDetails.getFiber());
            nutritionInfo.setSugar(nutritionInfoDetails.getSugar());
            nutritionInfo.setRecipe(nutritionInfoDetails.getRecipe());
            return nutritionInfoRepository.save(nutritionInfo);
        }
        return null;
    }

    public void deleteNutritionInfo(Long id) {
        nutritionInfoRepository.deleteById(id);
    }
}
