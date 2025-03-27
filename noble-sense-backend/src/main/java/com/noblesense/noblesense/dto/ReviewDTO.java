package com.noblesense.noblesense.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReviewDTO {
    private Long id;
    private String description;
    private int starsNumber;
    private String fullName;
    private String email;
    private Date date;
    private boolean isApproved;
    // to get product details
    private ProductDTO product;
}
