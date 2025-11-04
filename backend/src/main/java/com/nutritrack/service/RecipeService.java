package com.nutritrack.service;

import com.nutritrack.model.Recipe;
import com.nutritrack.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public Optional<Recipe> getRecipeById(Long id) {
        return recipeRepository.findById(id);
    }

    public Recipe createRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    public Recipe updateRecipe(Long id, Recipe recipeDetails) {
        Optional<Recipe> optionalRecipe = recipeRepository.findById(id);
        if (optionalRecipe.isPresent()) {
            Recipe recipe = optionalRecipe.get();
            recipe.setName(recipeDetails.getName());
            recipe.setDescription(recipeDetails.getDescription());
            recipe.setInstructions(recipeDetails.getInstructions());
            recipe.setPrepTime(recipeDetails.getPrepTime());
            recipe.setCookTime(recipeDetails.getCookTime());
            recipe.setServings(recipeDetails.getServings());
            return recipeRepository.save(recipe);
        }
        return null;
    }

    public void deleteRecipe(Long id) {
        recipeRepository.deleteById(id);
    }
}
