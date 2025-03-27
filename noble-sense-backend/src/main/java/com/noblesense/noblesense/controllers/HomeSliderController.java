package com.noblesense.noblesense.controllers;

import com.noblesense.noblesense.dto.HomeSliderDTO;
import com.noblesense.noblesense.exceptions.FileStorageException;
import com.noblesense.noblesense.exceptions.HomeSliderNotFoundException;
import com.noblesense.noblesense.services.HomeSliderService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@RequestMapping("/api/v1/homesliders")
@AllArgsConstructor
public class HomeSliderController {

    private HomeSliderService homeSliderService;

    @PostMapping
    public ResponseEntity<HomeSliderDTO> createHomeSlider(@RequestBody HomeSliderDTO homeSliderDTO) {
        HomeSliderDTO createdHomeSlider = homeSliderService.createHomeSlider(homeSliderDTO);
        return new ResponseEntity<>(createdHomeSlider, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<HomeSliderDTO>> getAllHomeSliders() {
        List<HomeSliderDTO> homeSliderList = homeSliderService.getAllHomeSliders();
        return new ResponseEntity<>(homeSliderList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<HomeSliderDTO> getHomeSliderById(@PathVariable Long id) {
        HomeSliderDTO homeSliderDTO = homeSliderService.getHomeSliderById(id);
        return new ResponseEntity<>(homeSliderDTO, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HomeSliderDTO> updateHomeSlider(@PathVariable Long id, @RequestBody HomeSliderDTO homeSliderDTO) {
        HomeSliderDTO updatedHomeSlider = homeSliderService.updateHomeSlider(id, homeSliderDTO);
        return new ResponseEntity<>(updatedHomeSlider, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHomeSlider(@PathVariable Long id) {
        homeSliderService.deleteHomeSlider(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    // add image to home slider
    @PostMapping("/{homeSliderId}/images")
    public ResponseEntity<HomeSliderDTO> addImageToHomeSlider(
            @PathVariable Long homeSliderId,
            @RequestParam("file") MultipartFile imageFile
    ) throws FileStorageException, HomeSliderNotFoundException {

        HomeSliderDTO updatedHomeSlider = homeSliderService.addImagesToHomeSlider(homeSliderId, imageFile);
        return ResponseEntity.ok(updatedHomeSlider);
    }
    @PostMapping("/{homeSliderId}/backgroundImage")
    public ResponseEntity<HomeSliderDTO> addBackgroundImageToHomeSlider(
            @PathVariable Long homeSliderId,
            @RequestParam("file") MultipartFile imageFile
    ) throws FileStorageException, HomeSliderNotFoundException {

        HomeSliderDTO updatedHomeSlider = homeSliderService.addBackgroundImagesToHomeSlider(homeSliderId, imageFile);
        return ResponseEntity.ok(updatedHomeSlider);
    }
    @DeleteMapping("/{homeSliderId}/images")
    public ResponseEntity<HomeSliderDTO> deleteImageFromProduct(
            @PathVariable Long homeSliderId,
            @RequestParam("imageUrl") String imageUrl
    ) throws HomeSliderNotFoundException {
        HomeSliderDTO updatedHomeSlider = homeSliderService.deleteImageFromHomeSlider(homeSliderId, imageUrl);
        return ResponseEntity.ok(updatedHomeSlider);
    }
}