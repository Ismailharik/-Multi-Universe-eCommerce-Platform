package com.noblesense.noblesense.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductReviewsDetailsDTO {
    private double averageStars;
    private int totalStars;
    private double fiveStarPercentage;
    private double fourStarPercentage;
    private double threeStarPercentage;
    private double twoStarPercentage;
    private double oneStarPercentage;

}
