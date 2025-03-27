package com.noblesense.noblesense.services;

import com.noblesense.noblesense.entities.HomeSlider;
import com.noblesense.noblesense.dto.HomeSliderDTO;
import com.noblesense.noblesense.exceptions.FileStorageException;
import com.noblesense.noblesense.exceptions.HomeSliderNotFoundException;
import com.noblesense.noblesense.exceptions.ImageNotFoundException;
import com.noblesense.noblesense.mappers.Mapper;
import com.noblesense.noblesense.repositories.HomeSliderRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class HomeSliderServiceImpl implements HomeSliderService {

    private final HomeSliderRepository homeSliderRepository;
    private static final Logger logger = LoggerFactory.getLogger(HomeSliderServiceImpl.class);

    private final Mapper mapper;

    private final FileStorageService fileStorageService;

    @Override
    public HomeSliderDTO createHomeSlider(HomeSliderDTO homeSliderDTO) {
        logger.info("createHomeSlider: " + homeSliderDTO);
        HomeSlider homeSlider = mapper.convertToHomeSlider(homeSliderDTO);
        homeSlider = homeSliderRepository.save(homeSlider);
        return mapper.convertToHomeSliderDTO(homeSlider);
    }

    @Override
    public List<HomeSliderDTO> getAllHomeSliders() {
        return homeSliderRepository.findAll().stream()
                .map(mapper::convertToHomeSliderDTO)
                .collect(Collectors.toList());
    }

    @Override
    public HomeSliderDTO getHomeSliderById(Long id) {
        HomeSlider homeSlider = homeSliderRepository.findById(id).orElseThrow(
                () -> new RuntimeException("HomeSlider not found"));
        return mapper.convertToHomeSliderDTO(homeSlider);
    }

    @Override
    public HomeSliderDTO updateHomeSlider(Long id, HomeSliderDTO homeSliderDTO) {
        HomeSlider existingHomeSlider = homeSliderRepository.findById(id).orElseThrow(
                () -> new RuntimeException("HomeSlider not found"));
        // keep the old images
        homeSliderDTO.setImg(existingHomeSlider.getImg());
        homeSliderDTO.setBackgroundImg(existingHomeSlider.getBackgroundImg());

        BeanUtils.copyProperties(mapper.convertToHomeSlider(homeSliderDTO), existingHomeSlider, "id");
        // to not delete images

        existingHomeSlider = homeSliderRepository.save(existingHomeSlider);
        return mapper.convertToHomeSliderDTO(existingHomeSlider);
    }

    @Override
    public void deleteHomeSlider(Long id) {

        homeSliderRepository.deleteById(id);
    }

    @Override
    public HomeSliderDTO addImagesToHomeSlider(Long homeSliderId, MultipartFile imageFile) throws HomeSliderNotFoundException,FileStorageException {
       // add image to home slider, implement it
        HomeSlider homeSlider = homeSliderRepository.findById(homeSliderId).orElseThrow(
                () -> new HomeSliderNotFoundException(homeSliderId)
        );
        if (imageFile != null && !imageFile.isEmpty()) {
            String originalFileName = imageFile.getOriginalFilename();
            String fileExtension = extractFileExtension(originalFileName);
            String uniqueFileName = generateUniqueFileName() + fileExtension;

            try {
                String fileUrl = fileStorageService.uploadFile(uniqueFileName,imageFile);
                homeSlider.setImg(fileUrl); // Add the new image file name to the list of URLs
            } catch (IOException e) {
                throw new FileStorageException("Failed to store file " + uniqueFileName);
            }
        }


        HomeSlider savedHomeSlider = homeSliderRepository.save(homeSlider);
        return mapper.convertToHomeSliderDTO(savedHomeSlider);

    }
    private String extractFileExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf('.'));
    }

    private String generateUniqueFileName() {
        return UUID.randomUUID().toString();
    }


    @Override
    public HomeSliderDTO deleteImageFromHomeSlider(Long sliderId, String imageUrl) throws HomeSliderNotFoundException, ImageNotFoundException {
       logger.info("deleteImageFromHomeSlider with id: "+sliderId +" img url: "+imageUrl);
        HomeSlider homeSlider = homeSliderRepository.findById(sliderId).orElseThrow(
               () -> new HomeSliderNotFoundException(sliderId)
       );

        if ((homeSlider.getImg() == null || !homeSlider.getImg().equals(imageUrl)) &&
                (homeSlider.getBackgroundImg() == null || !homeSlider.getBackgroundImg().equals(imageUrl))) {
            throw new ImageNotFoundException("Image URL not found for the category with ID: " + homeSlider.getId());
        }
        // Delete the image file from the server
        fileStorageService.deleteFile(imageUrl);
        if (homeSlider.getImg()!=null && imageUrl.contains(homeSlider.getImg())){
            homeSlider.setImg(null);
        }else {
            homeSlider.setBackgroundImg(null);
        }

        HomeSlider savedHomeSlider = homeSliderRepository.save(homeSlider);
        return mapper.convertToHomeSliderDTO(savedHomeSlider);
    }

    @Override
    public HomeSliderDTO addBackgroundImagesToHomeSlider(Long homeSliderId, MultipartFile imageFile) throws HomeSliderNotFoundException, FileStorageException {
        // add background image to home slider, implement it
        HomeSlider homeSlider = homeSliderRepository.findById(homeSliderId).orElseThrow(
                () -> new HomeSliderNotFoundException(homeSliderId)
        );
        if (imageFile != null && !imageFile.isEmpty()) {
            String originalFileName = imageFile.getOriginalFilename();
            String fileExtension = extractFileExtension(originalFileName);
            String uniqueFileName = generateUniqueFileName() + fileExtension;

            try {
                String fileUrl = fileStorageService.uploadFile(uniqueFileName,imageFile);
                homeSlider.setBackgroundImg(fileUrl); // Add the new image file name to the list of URLs

            } catch (IOException e) {
                throw new FileStorageException("Failed to store file " + uniqueFileName);
            }
        }

        HomeSlider savedHomeSlider = homeSliderRepository.save(homeSlider);
        return mapper.convertToHomeSliderDTO(savedHomeSlider);
    }
}
