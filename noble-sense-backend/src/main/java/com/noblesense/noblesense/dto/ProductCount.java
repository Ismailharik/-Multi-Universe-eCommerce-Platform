package com.noblesense.noblesense.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class ProductCount {
    private final String productName;
    private final long count;
}
