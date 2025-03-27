package com.noblesense.noblesense.dto;

import lombok.*;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Long id;
    private String sku;
    private String title;
//    private String slug;
//    private String unit;
    private List<String> imageURLs;
    private String parent;
    private double price;
    private double discount;
    private int quantity;
//    private String brand;
    private String status;
    private String productType;
    private String description;
    private Integer orderQuantity;
    private String additionalInformation;
    private boolean featured;
    private int sellCount;
    private OfferDateDTO offerDate;
    private List<String> tags;
    private String videoId;
    private String sizes;
    private Long categoryId;
    @Getter
    @Setter
    @ToString
    public static class OfferDateDTO {
        private Date startDate;
        private Date endDate;
    }
}
