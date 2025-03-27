package com.noblesense.noblesense.services;

import com.noblesense.noblesense.dto.CategoryDTO;
import com.noblesense.noblesense.dto.CategoryPage;
import com.noblesense.noblesense.exceptions.CategoryNotFoundException;
import com.noblesense.noblesense.exceptions.FileStorageException;
import com.noblesense.noblesense.exceptions.ImageNotFoundException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface CategoryService {
    CategoryPage getAllCategories(int page, int size);
    CategoryDTO getCategoryById(Long categoryId);
    CategoryDTO addCategory(CategoryDTO categoryDTO);
    void deleteCategory(Long categoryId);
    CategoryDTO updateCategory(long id,CategoryDTO categoryDTO);
    CategoryDTO addImagesToCategory(Long categoryId, MultipartFile imageFile)
            throws CategoryNotFoundException, FileStorageException;
    CategoryDTO deleteImageFromCategory(Long categoryId, String imageUrl)
            throws CategoryNotFoundException, ImageNotFoundException;

    List<CategoryDTO> getAllCategoriesByParent(String parent);
}
