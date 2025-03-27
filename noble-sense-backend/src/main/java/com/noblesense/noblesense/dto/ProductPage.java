package com.noblesense.noblesense.dto;

import lombok.Data;

import java.util.List;
@Data
public class ProductPage {
    private List<ProductDTO> products;
    private int totalPages;
    private int page;
    private int size;
    private boolean first;
    private boolean last;
}
