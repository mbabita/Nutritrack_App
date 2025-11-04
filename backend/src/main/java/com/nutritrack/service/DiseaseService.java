package com.nutritrack.service;

import com.nutritrack.model.Disease;
import com.nutritrack.repository.DiseaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DiseaseService {

    @Autowired
    private DiseaseRepository diseaseRepository;

    public List<Disease> getAllDiseases() {
        return diseaseRepository.findAll();
    }

    public Optional<Disease> getDiseaseById(Long id) {
        return diseaseRepository.findById(id);
    }

    public Disease createDisease(Disease disease) {
        return diseaseRepository.save(disease);
    }

    public Disease updateDisease(Long id, Disease diseaseDetails) {
        Optional<Disease> optionalDisease = diseaseRepository.findById(id);
        if (optionalDisease.isPresent()) {
            Disease disease = optionalDisease.get();
            disease.setName(diseaseDetails.getName());
            disease.setDescription(diseaseDetails.getDescription());
            return diseaseRepository.save(disease);
        }
        return null;
    }

    public void deleteDisease(Long id) {
        diseaseRepository.deleteById(id);
    }
}
