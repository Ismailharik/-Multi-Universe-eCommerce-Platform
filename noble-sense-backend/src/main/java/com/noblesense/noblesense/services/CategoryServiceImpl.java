package com.noblesense.noblesense.services;

import com.noblesense.noblesense.dto.CategoryDTO;
import com.noblesense.noblesense.dto.CategoryPage;
import com.noblesense.noblesense.entities.Category;
import com.noblesense.noblesense.exceptions.CategoryNotFoundException;
import com.noblesense.noblesense.exceptions.FileStorageException;
import com.noblesense.noblesense.exceptions.ImageNotFoundException;
import com.noblesense.noblesense.mappers.Mapper;
import com.noblesense.noblesense.repositories.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final Mapper mapper;
    private final FileStorageService fileStorageService;


    private static final Logger logger = LoggerFactory.getLogger(CategoryServiceImpl.class);

    @Override
    public CategoryPage getAllCategories(int page,int size) {
        logger.info(" getAllCategories page: "+page +" size: "+size);

        PageRequest pr = PageRequest.of(page,size);
        Page<Category> all = this.categoryRepository.findAll(pr);
        CategoryPage categoryPage = new CategoryPage();
        categoryPage.setCategories(all.map(category -> mapper.convertToCategoryDTO(category)).toList());
        categoryPage.setFirst(all.isFirst());
        categoryPage.setLast(all.isLast());
        categoryPage.setTotalPages(all.getTotalPages());
        categoryPage.setSize(all.getSize());
        categoryPage.setPage(all.getNumber());
        return categoryPage;
    }

    @Override
    public CategoryDTO getCategoryById(Long categoryId)  {
        logger.info(" getCategoryById categoryId: "+categoryId);

        Category category = categoryRepository.findById(categoryId).orElseThrow(()->new CategoryNotFoundException(categoryId));
        return mapper.convertToCategoryDTO(category);
    }

    @Override
    public CategoryDTO addCategory(CategoryDTO categoryDTO) {
        logger.info(" addCategory categoryDTO: "+categoryDTO);

        Category category = mapper.convertToCategory(categoryDTO);
        Category savedCategory= categoryRepository.save(category);

        return mapper.convertToCategoryDTO(savedCategory);
    }

    @Override
    public void deleteCategory(Long categoryId) {

        Category category = categoryRepository.findById(categoryId).orElseThrow(
                ()->new CategoryNotFoundException(categoryId));
        categoryRepository.delete(category);
    }
    @Override
    public CategoryDTO updateCategory(long id,CategoryDTO categoryDTO){
        logger.info(" updateCategory id: "+id+" categoryDTO: "+categoryDTO);
        Category updatedCategory = mapper.convertToCategory(categoryDTO);
        return mapper.convertToCategoryDTO(categoryRepository.save(updatedCategory));
    }

    @Override
    public CategoryDTO addImagesToCategory(Long categoryId, MultipartFile imageFile) throws CategoryNotFoundException, FileStorageException {
        logger.info(" addImagesToCategory categoryId: "+categoryId+" imageFile: "+imageFile.getOriginalFilename());

        Category category= categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException(categoryId));



        if (imageFile != null && !imageFile.isEmpty()) {
            String originalFileName = imageFile.getOriginalFilename();
            String fileExtension = extractFileExtension(originalFileName);
            String uniqueFileName = generateUniqueFileName() + fileExtension;

            try {
//                    imageFile.transferTo(new File(uploadDirectory + File.separator + uniqueFileName));
                String fileUrl = fileStorageService.uploadFile(uniqueFileName,imageFile);
                category.setImg(fileUrl); // Add the new image file name to the list of URLs
            } catch (IOException e) {
                throw new FileStorageException("Failed to store file " + uniqueFileName);
            }
        }


        Category saveCategory = categoryRepository.save(category);
        return mapper.convertToCategoryDTO(saveCategory);
    }



    private String extractFileExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf('.'));
    }

    private String generateUniqueFileName() {
        return UUID.randomUUID().toString();
    }


    @Override
    public CategoryDTO deleteImageFromCategory(Long categoryId, String imageUrl) throws CategoryNotFoundException, ImageNotFoundException {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException(categoryId));
        String url = category.getImg();
        if (url  == null || !url.contains(imageUrl)) {
            throw new ImageNotFoundException("Image URL not found for the category with ID: " + category);
        }

        // Delete the image file from the server
        fileStorageService.deleteFile(imageUrl);
        category.setImg(null); // Set the updated list of URLs to the product

        Category savedCategory = categoryRepository.save(category);
        return mapper.convertToCategoryDTO(savedCategory);
    }

    @Override
    public List<CategoryDTO> getAllCategoriesByParent(String parent) {
        List<Category> categories = categoryRepository.findAllByParent(parent);
        return categories.stream().map(mapper::convertToCategoryDTO).toList();
    }
}