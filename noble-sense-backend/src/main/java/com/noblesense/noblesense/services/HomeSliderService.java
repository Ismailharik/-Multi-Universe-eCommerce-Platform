package com.noblesense.noblesense.services;

import com.noblesense.noblesense.dto.HomeSliderDTO;
import com.noblesense.noblesense.exceptions.FileStorageException;
import com.noblesense.noblesense.exceptions.HomeSliderNotFoundException;
import com.noblesense.noblesense.exceptions.ImageNotFoundException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface HomeSliderService {
    HomeSliderDTO createHomeSlider(HomeSliderDTO homeSliderDTO);
    List<HomeSliderDTO> getAllHomeSliders();
    HomeSliderDTO getHomeSliderById(Long id);
    HomeSliderDTO updateHomeSlider(Long id, HomeSliderDTO homeSliderDTO);
    void deleteHomeSlider(Long id);

    HomeSliderDTO addImagesToHomeSlider(Long homeSliderId, MultipartFile imageFile) throws HomeSliderNotFoundException, FileStorageException;
    HomeSliderDTO deleteImageFromHomeSlider(Long productId, String imageUrl) throws HomeSliderNotFoundException, ImageNotFoundException;

    HomeSliderDTO addBackgroundImagesToHomeSlider(Long homeSliderId, MultipartFile imageFile) throws HomeSliderNotFoundException, FileStorageException;
}