package com.noblesense.noblesense.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryPage {
    List<CategoryDTO> categories;
    private int totalPages;
    private int page;
    private int size;
    private boolean first;
    private boolean last;
}
