package com.noblesense.noblesense.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HomeSlider {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    private PreTitle preTitle;

    private String title;

    @Embedded
    private Subtitle subtitle;

    private String img;

    private String backgroundColor;
    private String backgroundImg;
    private String parent;


    @Embeddable
    @Data
    public static class PreTitle {
        private String text;
        private double price;
    }

    @Embeddable
    @Data
    public static class Subtitle {
        private String text1;
        private int percent;
        private String text2;
    }
}