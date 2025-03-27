package com.noblesense.noblesense.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryDTO {
    private Long id;
    private String description;
    private String name;
    private String img;
    private int numberOfProducts;
    private String parent;
}
