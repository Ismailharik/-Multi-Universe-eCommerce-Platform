package com.noblesense.noblesense.dto;

import lombok.Data;

@Data
public class HomeSliderDTO {
    private Long id;
    private PreTitleDto preTitle;
    private String title;
    private SubtitleDto subtitle;
    private String img;
    private String backgroundColor;
    private String backgroundImg;
    private String parent; // below to each page

    @Data
    public static class PreTitleDto {
        private String text;
        private double price;
    }

    @Data
    public static class SubtitleDto {
        private String text1;
        private int percent;
        private String text2;
    }
}
