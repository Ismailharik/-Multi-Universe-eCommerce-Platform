package com.noblesense.noblesense.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemDTO {
    private long id;
    private double totalPrice;
    private int quantity;
    private ProductDTO product;
}
