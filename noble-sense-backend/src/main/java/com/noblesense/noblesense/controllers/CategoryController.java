package com.noblesense.noblesense.controllers;

import com.noblesense.noblesense.dto.CategoryDTO;
import com.noblesense.noblesense.dto.CategoryPage;
import com.noblesense.noblesense.exceptions.FileStorageException;
import com.noblesense.noblesense.services.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/categories")
public class CategoryController {
    private final CategoryService categoryService;


    @GetMapping
    public ResponseEntity<CategoryPage> getAllCategories(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        CategoryPage categories = categoryService.getAllCategories(page, size);
        return ResponseEntity.ok(categories);
    }
    @GetMapping("/parent/{parent}")
    public ResponseEntity<List<CategoryDTO>> getAllCategoriesByParent(
            @PathVariable String parent
    ) {
        List<CategoryDTO> allCategoriesByParent = categoryService.getAllCategoriesByParent(parent);
        return ResponseEntity.ok(allCategoriesByParent);
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<CategoryDTO> getCategoryById(@PathVariable Long categoryId){
        CategoryDTO category = categoryService.getCategoryById(categoryId);
        return ResponseEntity.ok(category);
    }

    @PostMapping("")
    public ResponseEntity<CategoryDTO> addCategory(@RequestBody CategoryDTO categoryDTO) {
        System.out.println(categoryDTO);
        CategoryDTO createdCategory = categoryService.addCategory(categoryDTO);
        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<CategoryDTO> updateCategory(
            @PathVariable Long categoryId,
            @RequestBody CategoryDTO categoryDTO
    ) {
        CategoryDTO updatedCategory = categoryService.updateCategory(categoryId, categoryDTO);
        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long categoryId) {
        categoryService.deleteCategory(categoryId);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/{categoryId}/images")
    public ResponseEntity<CategoryDTO> addImageToProduct(
            @PathVariable Long categoryId,
            @RequestParam("file") MultipartFile imageFile
    ) throws FileStorageException {

        CategoryDTO updatedCategory = categoryService.addImagesToCategory(categoryId, imageFile);
        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("/{categoryId}/images")
    public ResponseEntity<CategoryDTO> deleteImageFromProduct(
            @PathVariable Long categoryId,
            @RequestParam("imageUrl") String imageUrl
    ) {
        CategoryDTO updatedCategory = categoryService.deleteImageFromCategory(  categoryId, imageUrl);
        return ResponseEntity.ok(updatedCategory);
    }

}
