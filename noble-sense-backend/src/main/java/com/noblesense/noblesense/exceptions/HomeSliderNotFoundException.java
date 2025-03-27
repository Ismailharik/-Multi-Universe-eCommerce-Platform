package com.noblesense.noblesense.exceptions;

public class HomeSliderNotFoundException extends Exception {

    public HomeSliderNotFoundException(Long id) {
        super(String.format("HomeSlider not found with id: %s", id));
    }
}
